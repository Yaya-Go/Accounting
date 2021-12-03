import {db} from "./config";
import {Transaction} from "../models/types";

export const TagHooks = {
  onCreate: async (snapshot: any, context: any) => {
    try {
      const tagId = context.params.tagId;
      const batch = db.batch();

      batch.create(db.doc(`/metadata/tag-${ tagId }`), {
        category: 0,
        total: 0,
        tax: 0,
        subtotal: 0,
      });

      return batch.commit();
    } catch (error) {
      console.log(error);
      return;
    }
  },
  onDelete: async (snapshot: any, context: any) => {
    try {
      const tagId = context.params.tagId;
      const batch = db.batch();

      const categories = await db.collection("category").where("tagId", "==", tagId).get();

      if (!categories.empty) {
        const categoryIds = categories.docs.map((c) => c.id);

        categoryIds.forEach((id) => {
          batch.delete(db.doc(`/category/${ id }`));
          batch.delete(db.doc(`/metadata/category-${ id }`));
        });

        const transactions = await db.collection("transactions").where("categoryId", "in", categoryIds).get();

        if (!transactions.empty) {
          const transIds = transactions.docs.map((t) => t.id);

          transIds.forEach((id) => {
            batch.delete(db.doc(`/transactions/${ id }`));
          });
          const items = await db.collection("items").where("transId", "in", transIds).get();

          if (!items.empty) {
            items.forEach((doc) => {
              batch.delete(db.doc(`/items/${ doc.id }`));
            });
          }
        }
      }

      batch.delete(db.doc(`/metadata/tag-${ tagId }`));
      return batch.commit();
    } catch (error) {
      console.log(error);
      return;
    }
  },
};

export const CategroyHooks = {
  onCreate: async (snapshot: any, context: any) => {
    try {
      const categoryId = context.params.categoryId;
      const batch = db.batch();

      batch.create(db.doc(`/metadata/category-${ categoryId }`), {
        transactions: 0,
        total: 0,
        tax: 0,
        subtotal: 0,
      });

      return batch.commit();
    } catch (error) {
      console.log(error);
      return;
    }
  },
  onDelete: async (snapshot: any, context: any) => {
    try {
      const categoryId = context.params.categoryId;
      const batch = db.batch();

      const transactions = await db.collection("transactions").where("categoryId", "==", categoryId).get();

      if (!transactions.empty) {
        const transId = transactions.docs.map((d) => d.id);

        transId.forEach((id) => {
          batch.delete(db.doc(`/transactions/${ id }`));
        });

        const items = await db.collection("items").where("transId", "in", transId).get();

        if (!items.empty) {
          items.forEach((doc) => {
            batch.delete(db.doc(`/items/${ doc.id }`));
          });
        }
      }

      batch.delete(db.doc(`/metadata/category-${ categoryId }`));

      return batch.commit();
    } catch (error) {
      console.log(error);
      return;
    }
  },
};

export const TransactionHooks = {
  onCreate: async (snapshot: any, context: any) => {
    try {
      const batch = db.batch();
      const trans: Transaction = snapshot.data() as Transaction;

      const categoryDoc = db.doc(`/metadata/category-${ trans.categoryId }`);
      const metadata: any = (await categoryDoc.get()).data();
      metadata.transactions++;
      metadata.total = metadata.total + (trans.total || 0);
      metadata.subtotal = metadata.subtotal + (trans.subtotal || 0);
      metadata.tax = metadata.tax + (trans.tax || 0);

      batch.update(categoryDoc, metadata);

      return batch.commit();
    } catch (error) {
      console.log(error);
      return;
    }
  },
  onWrite: async (change: any, context: any) => {
    try {
      const batch = db.batch();
      const transBefore = change.before;
      const transAfter = change.after;

      if (transBefore.exists()) {
        const cateDoc = db.doc(`/metadata/category-${ (transAfter.data() as Transaction).categoryId }`);
        const cateMetadata: any = (await cateDoc.get()).data();

        if ((transAfter.data() as Transaction).total !== (transBefore.data() as Transaction).total) {
          cateMetadata.total = cateMetadata.total - (transBefore.data() as Transaction).total + (transAfter.data() as Transaction).total;
        }

        if ((transAfter.data() as Transaction).subtotal !== (transBefore.data() as Transaction).subtotal) {
          cateMetadata.subtotal = cateMetadata.subtotal - ((transBefore.data() as Transaction).subtotal || 0) + ((transAfter.data() as Transaction).subtotal || 0);
        }

        if ((transAfter.data() as Transaction).tax !== (transBefore.data() as Transaction).tax) {
          cateMetadata.tax = cateMetadata.tax - ((transBefore.data() as Transaction).tax || 0) + ((transAfter.data() as Transaction).tax || 0);
        }

        batch.update(cateDoc, cateMetadata);
      }

      return batch.commit();
    } catch (error) {
      console.log(error);
      return;
    }
  },
  onDelete: async (snapshot: any, context: any) => {
    try {
      const transId = context.params.transId;
      const batch = db.batch();

      const trans: Transaction = snapshot.data() as Transaction;

      const items = await db.collection("items").where("transId", "==", transId).get();

      if (!items.empty) {
        items.forEach((doc) => {
          batch.delete(db.doc(`/items/${ doc.id }`));
        });
      }

      const categoryDoc = db.doc(`/metadata/category-${ trans.categoryId }`);
      const metadata: any = (await categoryDoc.get()).data();

      metadata.transactions--;
      metadata.total = metadata.total - (trans.total || 0);
      metadata.subtotal = metadata.subtotal - (trans.subtotal || 0);
      metadata.tax = metadata.tax - (trans.tax || 0);

      batch.update(categoryDoc, metadata);

      return batch.commit();
    } catch (error) {
      console.log(error);
      return;
    }
  },
};
