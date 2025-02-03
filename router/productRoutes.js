const express = require('express');
const productController=require('../controllers/productController')
const authMiddelware = require('../Middelware/authMiddelware')
const multer=require('multer')
const validationMiddelware = require('../Middelware/validationMiddelware')
const isValidObjectIdMiddelware = require('../Middelware/validObjectIdMiddleware');  
const { createProductShema, updateProductSchema } = require('../validations/productValidations');
const validObjectIdMiddleware = require('../Middelware/validObjectIdMiddleware');

const router = express.Router();

const upload =multer({dest : "./public" })

router.get('/products', productController.getAllProducts);
router.post('/products', authMiddelware,upload.single('image'),validationMiddelware(createProductShema),productController.createProduct);
router.get('/product/:id',validObjectIdMiddleware, productController.getProduct);
router.put('/product/:id',authMiddelware,upload.single('image'),validationMiddelware(updateProductSchema),productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;    
