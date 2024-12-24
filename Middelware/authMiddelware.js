const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.APP_SECRET);
        req.user = await User.findById(id);
        next();
    } catch (e) {
        res.status(401).json({ message: 'Unauthenticated' });
    }
}