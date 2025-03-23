
const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/auth');
const controller = require('../controllers/controller');

router.get('/', controller.showLogin);
router.get('/guesthome', controller.guesthome);
router.get('/register', controller.showRegister);

//POST REGISTRATION FORM
router.post('/register', controller.register);

//POST LOGIN FORM
router.post('/login', controller.login);

//get logout route
router.get('/logout', controller.logout);

//get main route
router.get('/main', requireLogin, controller.main);
exports.router = router;
