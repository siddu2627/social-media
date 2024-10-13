const adminsController = require('../controllers/adminsController');
const express = require('express');

const router = express.Router();

router.post('/register', adminsController.adminsRegister);
router.post('/login', adminsController.adminsLogin);

router.get('/all-admins', adminsController.getAllAdmins);
router.get('/single-admin/:id', adminsController.getAdminsById)

module.exports = router;