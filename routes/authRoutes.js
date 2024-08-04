const express = require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authmiddleware = require('../middlewares/authmiddleware');
const router =express.Router();
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/current_user',authmiddleware,currentUserController)
module.exports = router