const express = require('express');
const productController=require('../controllers/productController')
const authMiddelware = require('../Middelware/authMiddelware')
const multer =require('multer')
const upload =multer({dest : "./public" })
const router = express.Router();

router.get('/products', productController.getallProducts);
router.post('/products', authMiddelware,upload.single('image') ,productController.createProduct);
router.get('/product/:id', productController.getProduct);
router.put('/product/:id',authMiddelware,upload.single('image') ,productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;