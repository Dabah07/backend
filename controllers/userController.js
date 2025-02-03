const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.register = async (req, res, next) => {
    try {

        const { username, password, phone, email, address } = req.body


        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'e-mail est déjà utilisé ' });
        }


        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            phone,
            address,
        });


        const token = jwt.sign({ id: user._id }, process.env.APP_SECRET);

        res.status(201).json({
            message: "Inscription réussie",
            token,
            user: {
                id: user._id, username: user.username, email: user.email,
            },
        });
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (!user) {
        return res.status(400).json({ message: 'Wrong email or password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.APP_SECRET);

    res.json({ token });
}
exports.account = async (req, res, next) => {
    return res.json(req.user)
}