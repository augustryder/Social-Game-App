
require('dotenv').config(); // Load .env file into process.env

const mysql = require('mysql2/promise'); // Promise version so we can use promises (whatever those are) instead of callbacks

// Create a connection pool with .env file values
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,   // Wait if all connections are in use
    connectionLimit: 10,    // Maximum number of connections, not sure what to set this to
    queueLimit: 0,  // Unlimited queue       
});

module.exports = pool;
