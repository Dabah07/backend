const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.APP_SECRET);
        req.user = await User.findById(id);
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'Unauthenticated' });
    }
}