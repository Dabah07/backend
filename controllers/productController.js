const Product = require('../models/Product');

exports.getallProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (e) {
        res.status(500).json({ message: 'server error' })
    }
}

exports.createProduct = async (req, res) => {
    const { name, price, description, image, category } = req.body
    try {
        const product = await Product.create({ name, price, description, image, category })
        res.status(201).json(product)
    } catch (e) { res.status(500).json({ message: 'server error' }) }


}
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        return product ? res.json(product) : res.status(404).json({ message: "error server" })
    } catch (e) {
        res.status(500).json({ message: 'server error' })
    }
}


exports.updateProduct = async (req, res) => {
    const { name, price, description, image, category } = req.body
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            product.name = name
            product.description = description
            product.image = image
            product.category = category
            product.price = price
            await product.save()
            res.json(product)


        } else {
            res.status(404).json({ message: 'product not exist' })
        }
    } catch (e) {
        res.status(500).json({ message: 'server error' })
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({ message: " product is not exsist" })
        } else {
            await product.deleteOne()
            res.json({ message: 'product is removed' })
        }
    } catch (e) {
        res.status(500).json({ message: 'server error' })
    }
}