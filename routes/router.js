
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.showLogin);
router.get('/home', controller.home);
router.get('/register', controller.showRegister);
exports.router = router;
