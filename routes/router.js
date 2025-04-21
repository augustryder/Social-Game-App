
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const path = require('path');

//get the pages
router.get('/', controller.home);
router.get('/home', controller.home);
router.get('/login', controller.showLogin);
router.get('/register', controller.showRegister);
router.get('/characters', controller.showCharacters);
router.get('/characters/:id', controller.showCharacter);
router.get('/users', controller.getUsers);
router.get('/profile', controller.showProfile);
router.get('/leaderboard', controller.showLeaderboard);
router.get('/changeusername', controller.showChangeUsername);
router.get('/game', controller.showGame);

//POST REGISTRATION FORM
router.post('/register', controller.register);

//POST LOGIN FORM
router.post('/login', controller.login);

//get logout route
router.get('/logout', controller.logout);

//post update username
router.post('/updateUsername', controller.updateUsername);

//delete account
router.post('/deleteaccount', controller.deleteAccount);

//getting all characters
router.get('/api/characters', controller.getAllCharactersJSON);
router.get('/api/preferences', controller.getAllPreferencesJSON);


//saving score route
router.get('/api/save-score', controller.saveScore);



exports.router = router;
