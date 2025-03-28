
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.home);
router.get('/home', controller.home);
router.get('/login', controller.showLogin);
router.get('/register', controller.showRegister);
router.get('/characters', controller.showCharacters);
router.get('/characters/:id', controller.showCharacter);
router.get('/users', controller.getUsers);
router.get('/profile', controller.showProfile);

//POST REGISTRATION FORM
router.post('/register', controller.register);

//POST LOGIN FORM
router.post('/login', controller.login);

//get logout route
router.get('/logout', controller.logout);

exports.router = router;
