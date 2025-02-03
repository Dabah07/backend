const express = require('express')
const userController=require('../controllers/userController')
const validationMiddelwar =require('../Middelware/validationMiddelware')
const authMiddelware =require('../Middelware/authMiddelware')
const {loginSchema}=require('../validations/authValidation')
const router= express.Router()




router.post('/register',userController.register)
router.post('/login' ,userController.login)
router.get('/account',validationMiddelwar(loginSchema),authMiddelware,userController.account)
module.exports= router

