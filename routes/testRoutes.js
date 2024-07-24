const express = require('express');
const { default: testController } = require('../controllers/testController');
const router = express.Router()
router.get('/test',testController)