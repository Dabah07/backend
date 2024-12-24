const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const user = await User.create({
          
            email:req.body.email,
            password:req.body.password
        });
        res.status(201).json(user)
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