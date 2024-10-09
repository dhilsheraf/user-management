const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const adauth = require('../middleware/adminAuth') 


//admin login
router.get('/login',adauth.isDashboard,adminController.loadLogin)

router.post('/login',adminController.login)

router.get('/dashboard',adauth.checkAdminSession,adminController.loadDashboard)

router.get('/logout',adauth.checkAdminSession,adminController.logout)

router.get("/edit/:id/:email",adminController.loadEditUser)
router.post("/edit",adminController.editUser)

router.get("/delete/:id", adminController.deleteUser)

//admin routes
router.get('/create', adauth.checkAdminSession, adminController.loadCreateUserForm);
router.post('/create', adauth.checkAdminSession, adminController.createUser);

router.get('/search', adauth.checkAdminSession, adminController.searchUser);



//export admin route
module.exports =  router       