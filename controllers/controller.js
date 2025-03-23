
const pool = require('../models/database'); // Database pool

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

module.exports = {
    home,
    showLogin,
    showRegister
};

