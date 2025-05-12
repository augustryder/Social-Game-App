// Import required modules
const pool = require('../models/database'); // Database pool
const bcrypt = require('bcrypt'); // Password hashing library


// App Logic Functions and Such

/**
 * Renders the home page
 */
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

/**
 * Renders the login page
 */
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

/**
 * Renders the registration page
 */
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

/**
 * Processes user registration form submission
 */
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
        
        // Rudimentary email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basically: "string" + "@" + "string" + "." + "string"
        if (!emailRegex.test(email)) {
            return res.render('pages/register', {
                error: 'Please enter a valid email address',
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

/**
 * Processes user login form submission
 */
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

/**
 * Logs out a user by destroying their session
 */
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

/**
 * Returns a JSON list of all users
 */
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

/**
 * Renders the characters listing page
 */
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

/**
 * Renders a single character's details page
 */
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

/**
 * Shows the user's profile page with their account information
 */
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

/**
 * Displays the top 10 users by high score
 */
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

/**
 * Renders the change username form
 */
async function showChangeUsername(req, res) {
    try {
        const connection = await pool.getConnection();
        console.log('Connection made to database!!');
        res.render('pages/changeusername');
        connection.release();
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
        throw err;
    }
}

/**
 * Processes a username change request
 */
async function updateUsername(req, res) {
    try {
        const connection = await pool.getConnection();
        const { username, newuser } = req.body;
        const userId = req.session.userId;
        
        // Basic validation
        if (!newuser) {
            return res.render('pages/changeusername', {
                error: 'Please enter a new username',
                username: req.session.username
            });
        }
        
        // Check if old username matches session username
        if (username !== req.session.username) {
            return res.render('pages/changeusername', {
                error: 'Current username does not match',
                username: req.session.username
            });
        }
        
        // Check if user exists
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE user_id = ?',
            [userId]
        );
        
        const user = rows[0];
        if (!user) {
            return res.render('pages/changeusername', {
                error: 'User not found',
                username: req.session.username
            });
        }
        
        // Check if new username is already taken
        const [existingUsers] = await connection.query(
            'SELECT * FROM users WHERE username = ? AND user_id != ?',
            [newuser, userId]
        );
        
        if (existingUsers.length > 0) {
            return res.render('pages/changeusername', {
                error: 'Username already taken',
                username: req.session.username
            });
        }
        
        // Update username in database
        await connection.query(
            'UPDATE users SET username = ? WHERE user_id = ?',
            [newuser, userId]
        );
        
        // Update session
        req.session.username = newuser;
        
        // Release connection
        connection.release();
        
        // Redirect to profile page with success message
        req.session.message = 'Username successfully updated';
        res.redirect('/profile');
        
    } catch (error) {
        console.error('Username update error:', error);
        res.render('pages/changeusername', {
            error: 'An error occurred while updating username',
            username: req.session.username
        });
    }
}

/**
 * Permanently deletes a user account
 */
async function deleteAccount(req, res) {
    try {
        // Check if user is logged in
        if (!req.session.userId) {
            return res.redirect('/login');
        }

        const connection = await pool.getConnection();
        
        // Delete the user from the database
        await connection.query('DELETE FROM users WHERE user_id = ?', [req.session.userId]);
        
        connection.release();
        
        // Clear the session
        req.session.destroy(function(err) {
            if (err) {
                console.error('Session destroy error:', err);
            }
            // Redirect to home page after successful deletion
            return res.redirect('/home');
        });
    } catch (error) {
        console.error('Account deletion error:', error);
        req.session.error = 'Failed to delete account. Please try again later.';
        return res.redirect('/profile');
    }
}

/**
 * Renders the game page
 */
async function showGame(req, res) {
    try {
        const connection = await pool.getConnection();
        console.log('Connection made to database!!');
        const username = req.session.username || null; // Get username from session or set to null for guests
        res.render('pages/game', { username }); // Pass username to template
        connection.release();
    } catch (err) {
        console.log(err);
        res.send('An error occurred');
        throw err;
    }
}

/**
 * Returns JSON data of all characters for the game
 */
const getAllCharactersJSON = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT c_id, name, image FROM characters');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({ error: 'Failed to fetch characters' });
    }
};

/**
 * Returns JSON data of all character preferences for the game
 */
const getAllPreferencesJSON = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT p.c_id, a.type, p.value
            FROM preferences p
            JOIN activity_item a ON p.a_id = a.a_id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({ error: 'Failed to fetch preferences' });
    }
};

/**
 * Saves a user's game score to their profile
 */
const saveScore = async (req, res) => {
    // Only process if user is logged in
    console.log("hitting this");

    
    const score = parseInt(req.query.score, 10);
    const userId = req.session.userId

    console.log(score, userId);
    
    
    if (isNaN(score)) {
        return res.redirect('/game?error=Invalid score');
    }
    
    try {
        // Get current user data
        const [users] = await pool.query(
            'SELECT high_score, games_played FROM users WHERE user_id = ?', 
            [userId]
        );
        
        if (users.length === 0) {
            return res.redirect('/game?error=User not found');
        }
        
        const user = users[0];
        const isHighScore = score > user.high_score;
        
        // Update user stats
        await pool.query(
            'UPDATE users SET games_played = games_played + 1, high_score = GREATEST(high_score, ?) WHERE user_id = ?',
            [score, userId]
        );
        
        // Redirect to leaderboard with success message
        return res.redirect('/leaderboard?success=Score saved' + 
                           (isHighScore ? '&highscore=true' : ''));
    } catch (error) {
        console.error('Error saving score:', error);
        return res.redirect('/game?error=Failed to save score');
    }
};

// Export all controller functions
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
    showLeaderboard,
    showChangeUsername,
    updateUsername,
    deleteAccount,
    showGame,
    getAllCharactersJSON,
    getAllPreferencesJSON,
    saveScore
};

