
const pool = require('../models/database'); // Database pool
const bcrypt = require('bcrypt');


// App Logic Functions and Such
async function home(req, res) {
    try {
        const connection = await pool.getConnection();
        console.log('Connection made to database!!');
        res.render('pages/home');
        connection.release();
    } catch (err) { 
        console.log(err);
        res.send('An error occurred');
        throw err;
    }
}

async function showLogin(req, res) {
    try {
        const connection = await pool.getConnection();
        console.log('Connection made to database!!');
        res.render('pages/login');
        connection.release();
    } catch (err) { 
        console.log(err);
        res.send('An error occurred');
        throw err;
    }
}

async function showRegister(req, res) {
    try {
        const connection = await pool.getConnection();
        console.log('Connection made to database!!');
        res.render('pages/register');
        connection.release();
    } catch (err) { 
        console.log(err);
        res.send('An error occurred');
        throw err;
    }
}

async function register(req, res) {
    try {
        const connection = await pool.getConnection();
        const {email, username, password} = req.body;
        // Basic validation
        if (!email || !username || !password) {
            return res.render('pages/register', {
            error: 'All fields are required',
            email,
            username
            });
        }
        // Check if email already exists
        const [emailCheck] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (emailCheck.length > 0) {
            return res.render('pages/register', {
            error: 'Email already in use',
            username
            });
        }
        
        // Check if username already exists
        const [usernameCheck] = await connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        
        if (usernameCheck.length > 0) {
            return res.render('pages/register', {
            error: 'Username already taken',
            email
            });
        }
        
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const [result] = await connection.query(
            'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
            [email, username, hashedPassword]
        );

        if (result.affectedRows === 1) {
            // Registration successful - redirect to login page
            return res.redirect('/?registered=true');
          } else {
            throw new Error('Failed to create user');
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.render('pages/register', {
          error: 'An error occurred during registration',
          email: req.body.email,
          username: req.body.username
        });
    }
}

module.exports = {
    home,
    showLogin,
    showRegister,
    register
};

