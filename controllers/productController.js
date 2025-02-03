const Product = require("../models/Product")
const productResouces = require("../resources/productResouces")
const { createProductShema } = require("../validations/productValidations")

exports.getAllProducts = async (req, res,next) => {
    const filters = {}

    if (req.query.category) {
        filters.category = req.query.category
    }
    if (req.query.name) {
        filters.name = { $regex: `.*${req.query.name}.*`, $options: 'i' }
    }
    const sort = {}

    if (req.query.sortBy && req.query.sortDirection) {
        sort[req.query.sortBy] = parseInt(req.query.sortDirection)
    }

    try {
        const products = await Product.find(filters).sort(sort);
        return res.json(products.map(product => productResouces(product)));
    } catch (e) {
        next(e)
    }
}

exports.createProduct = async (req, res,naxt) => {
    try {
        if(!req.file) {
            return res.status(422).json({message: 'The image is required'})
        }

        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.filename,
            quantity: req.body.quantity
        });
        return res.status(201).json(productResouces(product));
    } catch (e) {
       next(e)
    }
}

exports.getProduct = async (req, res,naxt) => {
    try {
        const product = await Product.findById(req.params.id);
        return product ? res.json(productResouces(product)) : res.status(404).json({ message: 'Product not found.' });
    } catch (e) {
        res.status(500).json({ message: 'An error happened.' });
    }
}
exports.updateProduct = async (req, res, next) => {
    try {
        if(!req.file) {
            return res.status(422).json({message: 'The image is required'})
        }
        
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            image: req.file.path,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            colors: req.body.colors,
            sizes: req.body.sizes
        }, { new: true })

        return res.json(productResource(updatedProduct))
    } catch (e) {
        next(e)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        await product.deleteOne()

        return res.json({message: 'Product deleted successfully'})
    } catch (e) {
        next(e)
    }
}