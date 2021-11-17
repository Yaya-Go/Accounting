const { db } = require('../config/db');

const Tags = {
    Retrieve: async (req, res) => {},

    List: async (req, res) => {
        try {
            let tags = [];

            const data = await db.collection(`tags`).where('userId', '==', req.userId).get();
            if (!data) return res.json([]);

            data.forEach(doc => {
                if (doc.exists) {
                    const tag = doc.data();
                    tag.tagId = doc.id;
                    tags.push(tag);
                }
            });

            return res.json(tags);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    Create: async (req, res) => {
        try {
            let newTag = { ...req.body };
            
            if (!newTag.name) return res.status(400).json({ error: 'errors.tag.bad_name' });

            newTag.createdAt = new Date().toISOString();
            newTag.updatedAt = new Date().toISOString();
            newTag.userId = req.userId;

            const data = await db.collection('tags').add(newTag);
            newTag.tagId = data.id;

            return res.json(newTag);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    Update: async (req, res) => {
        try {
            
            if (!req.body.name) return res.status(400).json({ error: 'error.tag.badname' });

            const document = db.doc(`/tags/${ req.params.tagId }`);
            const data = await document.get();

            if (!data.exists) return res.status(404).json({ error: 'error.tag.notfound' });

            let tag = data.data();

            if (tag.userId !== req.userId) return res.status(400).json({ error: 'error.tag.diffuserId' });
            
            tag.name = req.body.name;
            tag.updatedAt = new Date().toISOString();
            await document.update(tag);

            return res.json({ message: 'tag.update.success' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    Delete: async (req, res) => {
        try {
            const document = db.doc(`/tags/${ req.params.tagId }`);
            const data = await document.get();

            if (!data.exists) return res.status(404).json({ error: 'error.tag.notfound' });

            const tag = data.data();

            if (tag.userId !== req.userId) return res.status(400).json({ error: 'error.tag.diffuserId' });

            await document.delete();

            return res.json({ message: 'tag.delete.success' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    ListCategory: async (req, res) => {
        try {
            let results = [];

            const doc = await db.collection('category').where('tagId', '==', req.params.tagId).get();
                        
            if (!doc.empty) {
                let documents = [];
                let list = {};
                doc.forEach(d => {
                    const data = d.data();
                    data.categoryId = d.id;
                    documents.push(db.doc(`/metadata/category-${ d.id }`));
                    list[d.id] = data;
                });
                const metadata = await db.getAll(...documents);

                metadata.forEach(m => {
                    const data = list[m.id.split('-')[1]];
                    data.metadata = m.data();
                    results.push(data);
                })
            }

            return res.json(results);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}

module.exports = Tags;