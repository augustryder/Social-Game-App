
const pool = require('../models/database'); // Database pool
const bcrypt = require('bcrypt');


// App Logic Functions and Such
async function home(req, res) {
    try {
        const connection = await pool.getConnection();
        console.log('Connection made to database!!');
        const username = req.session.username || null; // Get username from session or set to null for guests
        res.render('pages/home', { username }); // Pass username to template
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
        const { email, username, password } = req.body;
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

async function login(req, res) {
    try {
        const connection = await pool.getConnection();
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.render('pages/login', {
                error: 'Username and password are required',
                username
            });
        }

        // Check if user exists
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        const user = rows[0];

        if (!user) {
            return res.render('pages/login', {
                error: 'Invalid username or password',
                username
            });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render('pages/login', {
                error: 'Invalid username or password',
                username
            });
        }

        // Set session data
        req.session.userId = user.user_id;
        req.session.username = user.username;
        req.session.isLoggedIn = true;

        // Redirect to home page
        res.redirect('/home');
    } catch (error) {
        console.error('Login error:', error);
        res.render('pages/login', {
            error: 'An error occurred during login',
            username: req.body.username
        });
    }
}

async function logout(req, res) {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('An error occurred during logout');
        }

        // Redirect to the login page after logout
        res.redirect('/');
    });
}

async function getUsers(req, res) {
    try {
        const connection = await pool.getConnection();
        const [users] = await connection.query('SELECT * FROM users');
        connection.release();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred');
    }
}

async function showCharacters(req, res) {
    try {
        const connection = await pool.getConnection();
        await connection.query('USE social_game_db');
        const [characters] = await connection.query('SELECT * FROM characters');
        connection.release();
        res.render('pages/characters', { characters });
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
        throw err;
    }
}

async function showCharacter(req, res) {
    try {
        const connection = await pool.getConnection();
        await connection.query('USE social_game_db');
        const [character] = await connection.query('SELECT * FROM characters WHERE c_id = ?', [req.params.id]);
        const [preferences] = await connection.query(`
    SELECT ai.name, ai.description, p.value, ai.type, at.image AS type_image
    FROM preferences p
    JOIN activity_item ai ON p.a_id = ai.a_id
    JOIN activity_type at ON ai.type = at.name
    WHERE p.c_id = ?
`, [req.params.id]);
        connection.release();

        // Edit value to show as a string instead of a number (hide the number)
        preferences.forEach(preference => {
            if (preference.value === 1) {
                preference.value = 'Likes ♥';
            } else if (preference.value > 1) {
                preference.value = '♥ Loves ♥';
            }
            else if (preference.value === 0) {
                preference.value = 'Dislikes ✕';
            } else if (preference.value < 0) {
                preference.value = '✕ Hates ✕';
            }
        });

        if (character.length > 0) {
            res.render('pages/character', { character: character[0], preferences });
        } else {
            res.status(404).send('Character not found');
        }
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
        throw err;
    }
}

async function showProfile(req, res) {
    try {
        if (!req.session || !req.session.userId) {
            return res.redirect('/login');
        }
        const connection = await pool.getConnection();
        const { userId } = req.session;

        try {
            // Query the database for user profile information
            const [rows] = await connection.query(
                `SELECT username, email, DATE_FORMAT(join_date, '%M %d, %Y') as formatted_join_date, 
                 high_score, games_played, account_status 
                 FROM users WHERE user_id = ?`,
                [userId]
            );

            if (rows.length === 0) {
                return res.status(404).send('User not found');
            }

            // Get user data
            const userData = rows[0];

            // Render the profile page with user data
            res.render('pages/profile', {
                username: userData.username,
                email: userData.email,
                joinDate: userData.formatted_join_date,
                highScore: userData.high_score,
                gamesPlayed: userData.games_played,
                accountStatus: userData.account_status
            });
        } finally {
            // Always release the connection back to the pool
            connection.release();
        }
    } catch (err) {
        console.error('Error in showProfile:', err);
        res.status(500).send('An error occurred while retrieving profile data');
    }
}

async function showLeaderboard(req, res) { 
    try {
        const connection = await pool.getConnection();
        const [leaderboard] = await connection.query(
            `SELECT username, high_score, games_played
             FROM users 
             WHERE account_status = 'active'
             ORDER BY high_score DESC 
             LIMIT 10`
        );
        res.render('pages/leaderboard', { leaderboard });
        connection.release();
    } catch (err) {
        console.error('Error in showLeaderboard:', err);
        res.status(500).send('An error occurred while retrieving leaderboard data');
    }
}


// async function main(req, res) {
//     try {
//         // Access session data
//         const { username, userId } = req.session;

//         // You can fetch additional user data from the database if needed
//         // For example:
//         // const userData = await connection.query('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);

//         // Render the main page with the session data
//         res.render('pages/main', {
//             username,
//             userId,
//             title: 'Social Circle - Main'
//             // Add any other data you want to pass to the template
//         });
//     } catch (error) {
//         console.error('Error rendering main page:', error);
//         res.status(500).render('pages/error', {
//             error: 'An error occurred while loading the main page'
//         });
//     }
// }

module.exports = {
    home,
    showLogin,
    showRegister,
    register,
    login,
    logout,
    showCharacters,
    showCharacter,
    getUsers,
    showProfile,
    showLeaderboard
};

