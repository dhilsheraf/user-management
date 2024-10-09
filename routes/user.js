const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

//sign up
router.get('/signup',auth.isLogin,userController.loadSignUp)
router.post('/signup',userController.signUpUser);


//login 
router.get('/login',auth.isLogin,userController.loadLogin)
router.post('/login',userController.login)

//home
router.get('/home',auth.checkSession,userController.loadHome); 

//logout
router.get('/logout',auth.checkSession,userController.logout);


//exporting router
module.exports = router ;  