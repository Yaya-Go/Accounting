const functions = require("firebase-functions");
const { db } = require("./src/config/db");
const APP = require('./src/app');

exports.api = functions.region('us-east4').https.onRequest(APP);

exports.onTagDeleted = functions
    .region('us-east4')
    .firestore
    .document('/tags/{tagId}')
    .onDelete(async (snapshot, context) => {
        try {
            const tagId = context.params.tagId;
            const batch = db.batch();

            const totalDoc = db.doc('/metadata/total');
            const total = (await totalDoc.get()).data();
            total.tags--;

            const categories = await db.collection('category').where('tagId', '==', tagId).get();

            if (!categories.empty) {
                const categoryIds = categories.map(c => c.id);
                categories.forEach(doc => { 
                    batch.delete(db.doc(`/category/${ doc.id }`));
                    batch.delete(db.doc(`/metadata/category-${ doc.id }`));
                    total.category--;
                });
                const transactions = await db.collection('transactions').where('categoryId', 'in', categoryIds).get();

                if (!transactions.empty) {
                    const transIds = transactions.map(t => t.transId);
                    transactions.forEach(doc => { 
                        batch.delete(db.doc(`/transactions/${ doc.id }`));
                        total.transaction--;
                    });
                    const items = await db.collection('items').where('transId', 'in', transIds).get();

                    if (!items.empty) {
                        items.forEach(doc => { batch.delete(db.collection(`/items/${ doc.id }`)) });
                    }
                }
            }

            batch.update(totalDoc, total);
            batch.delete(db.doc(`/metadata/tag-${ tagId }`));

            return batch.commit();
        } catch (error) {
            console.log(error);
        }
    });

exports.onTagCreated = functions
    .region('us-east4')
    .firestore
    .document('/tags/{tagId}')
    .onCreate(async (snap, context) => {
        try {            
            const tagId = context.params.tagId;
            const batch = db.batch();

            const totalDoc = db.doc('/metadata/total');
            const total = (await totalDoc.get()).data();            
            total.tags++;

            batch.update(totalDoc, total);
            
            batch.create(db.doc(`/metadata/tag-${ tagId }`), {
                category: 0,
                total: 0,
                tax: 0,
                subtotal: 0
            });

            return batch.commit();
        } catch (error) {
            console.log(error);
        }
    });

exports.onCategoryDeleted = functions
    .region('us-east4')
    .firestore
    .document('/category/{categoryId}')
    .onDelete(async (snapshot, context) => {
        try {
            const categoryId = context.params.categoryId;
            const tagId = snapshot.data().tagId;
            const batch = db.batch();

            const totalDoc = db.doc('/metadata/total');
            const total = (await totalDoc.get()).data();
            total.category--;

            const tagDoc = db.doc(`/metadata/tag-${ tagId }`);
            const tag = (await tagDoc.get()).data();
            tag.category--;

            const transactions = await db.collection('transactions').where('categoryId', '==', categoryId).get();

            if (!transactions.empty) {
                const transIds = transactions.map(t => t.transId);
                transactions.forEach(doc => { 
                    batch.delete(db.doc(`/transactions/${ doc.id }`));
                    total.transaction--;
                    tag.transaction--;
                });

                const items = await db.collection('items').where('transId', 'in', transIds).get();

                if (!items.empty) {
                    items.forEach(doc => { batch.delete(db.collection(`/items/${ doc.id }`)) });
                }
            }            

            batch.update(totalDoc, total);
            batch.update(tagDoc, tag);
            batch.delete(db.doc(`/metadata/category-${ categoryId }`));

            return batch.commit();
        } catch (error) {
            console.log(error);
        }
    });

exports.onCategoryCreate = functions
    .region('us-east4')
    .firestore
    .document('/category/{categoryId}')
    .onCreate(async (snap, context) => {
        try {
            const categoryId = context.params.categoryId;
            const batch = db.batch();

            const category = snap.data();

            const totalDoc = db.doc('/metadata/total');
            const total = (await totalDoc.get()).data();            
            total.category++;
            batch.update(totalDoc, total);

            const tagDoc = db.doc(`/metadata/tag-${ category.tagId }`);
            const tagMetadata = (await tagDoc.get()).data();
            tagMetadata.category++;
            batch.update(tagDoc, tagMetadata);
            
            batch.create(db.doc(`/metadata/category-${ categoryId }`), {
                transaction: 0,
                total: 0,
                tax: 0,
                subtotal: 0
            });
            
            return batch.commit();
        } catch (error) {
            console.log(error);
        }
    });

exports.onTransactionDeleted = functions
    .region('us-east4')
    .firestore
    .document('/transactions/{transId}')
    .onDelete(async (snapshot, context) => {
        try {
            const transId = context.params.transId;
            const batch = db.batch();

            const totalDoc = db.doc('/metadata/total');
            const total = (await totalDoc.get()).data();
            total.transaction--;

            const categoryDoc = db.doc(`/metadata/category-${ snapshot.data().categoryId }`);
            const category = (await categoryDoc.get()).data();
            category.transaction--;

            const items = await db.collection('items').where('transId', '==', transId).get();
            
            if (!items.empty) {
                items.forEach(doc => { batch.delete(db.collection(`/items/${ doc.id }`)) });
            }

            batch.update(totalDoc, total);
            batch.update(categoryDoc, category);

            return batch.commit();
        } catch (error) {
            console.log(error);
        }
    })