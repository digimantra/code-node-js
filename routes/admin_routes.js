const express = require('express');
const adminRoutes = express.Router();
const adminController = require('../controller/admin_controller')

//##### Admin Routes #####//
adminRoutes.post('/add', adminController.addAdmin)

adminRoutes.get('/get', adminController.getAdmin)

adminRoutes.put('/edit/:id', adminController.updateAdmin)

adminRoutes.delete('/delete/:id', adminController.deleteAdmin)

adminRoutes.post('/login', adminController.adminLogin)

module.exports = adminRoutes