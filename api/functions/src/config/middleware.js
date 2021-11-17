const { admin, db } = require('./db');

module.exports = async (req, res, next) => {
    try {
        if (
            req.headers.authorization && 
            req.headers.authorization.startsWith('YYG-Account ')
        ) {
            idToken = req.headers.authorization.split('YYG-Account ')[1];
        } else {
            return res.status(401).json({ error: 'errors.unauthorized' });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);

        req.userId = decodedToken.uid;

        next();
    } catch (error) {
        return res.status(401).json({ error });
    }
};