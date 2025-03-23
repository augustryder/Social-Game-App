
// Require the express module
const express = require('express');
const app = express();

// Set port
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Require and use the router module
const router = require('./routes/router').router;
app.use('/', router);
app.use('/home', router);
app.use('/register', router);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
