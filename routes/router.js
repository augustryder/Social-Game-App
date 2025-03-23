
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.test);
router.get('/login', controller.showLogin);
router.get('/register', controller.showRegister);
exports.router = router;
