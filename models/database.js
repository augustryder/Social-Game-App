
require('dotenv').config(); // Load .env file into process.env

const mysql = require('mysql2/promise'); // Promise version so we can use promises (whatever those are) instead of callbacks


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,  
    queueLimit: 0,  
});

module.exports = pool;
