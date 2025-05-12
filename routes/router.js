const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const path = require('path');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Renders the home page
 *     description: Displays the main home page with user information if logged in
 *     responses:
 *       200:
 *         description: Home page rendered successfully
 */
router.get('/', controller.home);

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Renders the home page
 *     description: Alternative route to display the main home page
 *     responses:
 *       200:
 *         description: Home page rendered successfully
 */
router.get('/home', controller.home);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Renders the login page
 *     description: Displays the login form for user authentication
 *     responses:
 *       200:
 *         description: Login page rendered successfully
 */
router.get('/login', controller.showLogin);

/**
 * @swagger
 * /instructions:
 *   get:
 *     summary: Renders the instructions page
 *     description: Displays the instructions on how to play the game
 *     responses:
 *       200:
 *         description: Instructions page rendered successfully
 */
router.get('/instructions', controller.showInstructions);

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Renders the registration page
 *     description: Displays the registration form for new users
 *     responses:
 *       200:
 *         description: Registration page rendered successfully
 */
router.get('/register', controller.showRegister);

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Renders the characters listing page
 *     description: Displays a list of all characters from the database
 *     responses:
 *       200:
 *         description: Characters page rendered successfully
 */
router.get('/characters', controller.showCharacters);

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Renders a specific character's details page
 *     description: Displays detailed information about a character by ID including preferences
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Character ID
 *     responses:
 *       200:
 *         description: Character details page rendered successfully
 *       404:
 *         description: Character not found
 */
router.get('/characters/:id', controller.showCharacter);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns a JSON list of all users
 *     description: API endpoint that returns all users in the database
 *     responses:
 *       200:
 *         description: A JSON array of user objects
 *       500:
 *         description: Server error
 */
router.get('/users', controller.getUsers);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Renders the user's profile page
 *     description: Displays the logged-in user's account information and stats
 *     responses:
 *       200:
 *         description: Profile page rendered successfully
 *       302:
 *         description: Redirected to login if not authenticated
 */
router.get('/profile', controller.showProfile);

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Displays the top 10 users by high score
 *     description: Shows a leaderboard of the top performing users in the game
 *     responses:
 *       200:
 *         description: Leaderboard page rendered successfully
 *       500:
 *         description: Server error
 */
router.get('/leaderboard', controller.showLeaderboard);

/**
 * @swagger
 * /changeusername:
 *   get:
 *     summary: Renders the change username form
 *     description: Displays a form that allows users to update their username
 *     responses:
 *       200:
 *         description: Change username page rendered successfully
 */
router.get('/changeusername', controller.showChangeUsername);

/**
 * @swagger
 * /game:
 *   get:
 *     summary: Renders the game page
 *     description: Displays the main game interface for users to play
 *     responses:
 *       200:
 *         description: Game page rendered successfully
 */
router.get('/game', controller.showGame);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Processes user registration form submission
 *     description: Creates a new user account with encrypted password
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirects to home page on success or back to register with errors
 */
router.post('/register', controller.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Processes user login form submission
 *     description: Authenticates user credentials and creates a session
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirects to home page on success or back to login with errors
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logs out a user by destroying their session
 *     description: Ends the user's current session and redirects to home page
 *     responses:
 *       302:
 *         description: Redirects to home page after destroying session
 *       500:
 *         description: Error during logout process
 */
router.get('/logout', controller.logout);

/**
 * @swagger
 * /updateUsername:
 *   post:
 *     summary: Processes a username change request
 *     description: Updates the logged-in user's username after validation
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - newuser
 *             properties:
 *               username:
 *                 type: string
 *                 description: Current username
 *               newuser:
 *                 type: string
 *                 description: New username
 *     responses:
 *       302:
 *         description: Redirects to profile page on success or back to form with errors
 */
router.post('/updateUsername', controller.updateUsername);

/**
 * @swagger
 * /deleteaccount:
 *   post:
 *     summary: Permanently deletes a user account
 *     description: Removes the logged-in user's account from the database
 *     responses:
 *       302:
 *         description: Redirects to home page after successful deletion
 */
router.post('/deleteaccount', controller.deleteAccount);

/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Returns JSON data of all characters for the game
 *     description: API endpoint that provides character data for the game interface
 *     responses:
 *       200:
 *         description: A JSON array of character objects
 *       500:
 *         description: Server error
 */
router.get('/api/characters', controller.getAllCharactersJSON);

/**
 * @swagger
 * /api/preferences:
 *   get:
 *     summary: Returns JSON data of all character preferences for the game
 *     description: API endpoint that provides character preference data for gameplay
 *     responses:
 *       200:
 *         description: A JSON array of character preferences
 *       500:
 *         description: Server error
 */
router.get('/api/preferences', controller.getAllPreferencesJSON);

/**
 * @swagger
 * /api/save-score:
 *   get:
 *     summary: Saves a user's game score to their profile
 *     description: Updates user stats with new game score and increments games played
 *     parameters:
 *       - in: query
 *         name: score
 *         required: true
 *         schema:
 *           type: integer
 *         description: Game score to save
 *     responses:
 *       302:
 *         description: Redirects to leaderboard on success or game page on error
 */
router.get('/api/save-score', controller.saveScore);

exports.router = router;