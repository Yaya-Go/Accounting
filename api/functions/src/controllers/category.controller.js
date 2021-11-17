const { db } = require('../config/db');

const Category = {
    Retrieve: async (req, res) => {},

    List: async (req, res) => {},

    Create: async (req, res) => {
        try {
            let newCategory = { ...req.body };
            
            if (!newCategory.name) return res.status(400).json({ error: 'errors.category.bad_name' });
            if (!newCategory.tagId) return res.status(400).json({ error: 'errors.category.bad_tagId' });

            newCategory.createdAt = new Date().toISOString();
            newCategory.updatedAt = new Date().toISOString();
            newCategory.userId = req.userId;

            const data = await db.collection('category').add(newCategory);
            newCategory.categoryId = data.id;
            newCategory.metadata = {
                transaction: 0,
                total: 0,
                tax: 0,
                subtotal: 0
            }

            return res.json(newCategory);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    Update: async (req, res) => {
        try {
            
            if (!req.body.name) return res.status(400).json({ error: 'error.category.badname' });

            const document = db.doc(`/category/${ req.params.categoryId }`);
            const data = await document.get();

            if (!data.exists) return res.status(404).json({ error: 'error.category.notfound' });

            let category = data.data();

            if (category.userId !== req.userId) return res.status(400).json({ error: 'error.category.diffuserId' });
            
            category.name = req.body.name;
            category.updatedAt = new Date().toISOString();

            await document.update(category);

            return res.json({ message: 'category.update.success' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    Delete: async (req, res) => {
        try {
            const document = db.doc(`/category/${ req.params.categoryId }`);
            const data = await document.get();

            if (!data.exists) return res.status(404).json({ error: 'error.category.notfound' });

            const category = data.data();

            if (category.userId !== req.userId) return res.status(400).json({ error: 'error.category.diffuserId' });

            await document.delete();

            return res.json({ message: 'category.delete.success' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    ListTransaction: async (req, res) => {
        try {
            let results = [];

            const doc = await db.collection('transactions').where('categroy', '==', req.params.categoryId).get();

            if (!doc.empty) {
                doc.forEach(d => { results.push(d.data()); });
            }

            return res.json(results);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}

module.exports = Category;