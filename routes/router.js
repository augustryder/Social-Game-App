
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.showLogin);
router.get('/home', controller.home);
router.get('/register', controller.showRegister);

//POST REGISTRATION FORM
router.post('/register', controller.register);
exports.router = router;
