
-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS social_game_db;
USE social_game_db;

-- Create and populate tables and stuff

--createing the base user table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Stores bcrypt hash
    email VARCHAR(100) UNIQUE NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    high_score INT DEFAULT 0,
    games_played INT DEFAULT 0,
    account_status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
);