
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

CREATE TABLE characters (
    c_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL
);

-- Denotes the type of activity or item that a character can have a preference for
-- This is so that we can have lots of fun activies and items, and group them by type for gameplay purposes
CREATE TABLE activity_type (
    name VARCHAR (255) PRIMARY KEY,
    image VARCHAR(255) NULL,
);

-- An activity or item that a character can have a preference for
CREATE TABLE activity_item (
    a_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR (255) REFERENCES activity_type(name)
);

-- A table to store the preferences of characters for activities or items
CREATE TABLE preferences (
    p_id INT AUTO_INCREMENT PRIMARY KEY,
    c_id INT NOT NULL,
    a_id INT NOT NULL,
    value INT NOT NULL,
    FOREIGN KEY (c_id) REFERENCES characters(c_id),
    FOREIGN KEY (a_id) REFERENCES activity_type(a_id)
);


-- POPULATE BASIC DATA FOR CHARACTERS

INSERT INTO characters (name, description, image) VALUES
('Chadwick Jones', 'You met Chadwick back in high school, where he used to be backup quarterback for the football team and made a habit of stealing your lunch money. He has calmed down a bit since then, and is occasionally good company to you. These days, he spends most of his time either investing in niche cryptocurrencies, or working on his personal development podcast called "Grind, Conquer, Repeat: How to pick up women, crush betas, and dominate the financial world". You always though this is a silly and convoluted title, but he insists it is catchy.', 'chadwick.png');

INSERT INTO characters (name, description, image) VALUES
('Luna Moon', ' Luna is a free-spirited ray of sunshine, overflowing with warmth and boundless enthusiasm for the world around her. A proud vegan and a devoted advocate of all things natural, she swears by the healing power of crystals and will happily spend hours explaining their energies to anyone who will listen. She has a gift for making people feel heard, always offering a kind word or a thoughtful perspective. Lately, she''s been diving headfirst into the art of homebrewing kombucha, eagerly experimenting with bold new flavors. However, despite her best efforts, her concoctions remain almost unbearably gag-inducing. You adore her as a dear friend, but struggle to smile through every taste test. ', 'luna.png');

INSERT INTO characters (name, description, image) VALUES
('Glorp and Zorp', 'You met Glorp and Zorp on the weirdest night of your life—when a UFO beamed you straight out of bed by mistake. Realizing their cosmic blunder, they promptly zapped you back home, but not before snagging your number so you could all "hang" sometime. Say what you will about extraterrestrials, but these alien twins know how to throw down. Enthusiastic partygoers with an lack of understanding for human customs, they’re always up for a night out. Sure, they might still not completely understand tipping culture, but they''re a riot at your local bar—and honestly, who could say no to intergalactic drinking buddies?', 'glorpZorp.png');

INSERT INTO characters (name, description, image) VALUES 
('Bella Blackthorn', 'Bella is a walking enigma, draped in shadows and wrapped in an air of timeless mystery. Her gothic style is as dark and captivating as her presence, with a flair for the dramatic that makes every glance feel like a scene from a lost Victorian novel. She revels in the macabre, her bookshelves overflowing with the works of Edgar Allan Poe and Mary Shelley—though she''d never admit to the well-worn stack of cheesy romance novels hidden behind them. With a sharp wit and a sharper tongue, she never holds back, yet there''s something undeniably charming about her biting remarks. A true creature of the night, she thrives after sundown, never quite explaining why you''ve never seen her in direct sunlight.', 'bella.png');

INSERT INTO characters (name, description, image) VALUES
('Rex "The Flex" Thompson', 'Rex is a human protein shake in the shape of a man. He lives by three rules: Lift heavy, eat big, and never skip arm day. His wardrobe consists exclusively of gym tanks, and his biceps have their own gravitational pull. He speaks almost entirely in gym metaphors, referring to life’s challenges as "mental PRs" and bad days as "rest days for the soul." Despite his meathead persona, he''s surprisingly wholesome—his ultimate dream isn’t just to be swole, but to help others be swole too. If you need a spot at the gym or an overenthusiastic pep talk, Rex is your guy. Just don’t ask him to stop flexing in every reflective surface.', 'rex.png');

-- POPULATE ACTIVITY TYPES

INSERT INTO activity_type (name, image) VALUES
('Food', 'food.png');

INSERT INTO activity_type (name, image) VALUES
('Entertainment', 'entertainment.png');

INSERT INTO activity_type (name, image) VALUES
('Sports', 'hobby.png');

INSERT INTO activity_type (name, image) VALUES
('Crafts', 'crafts.png');

INSERT INTO activity_type (name, image) VALUES
('Music', 'music.png');

-- POPULATE ACTIVITY ITEMS

INSERT INTO activity_item (name, description, type) VALUES
('Read a novel', 'Reading a novel is a great way to relax and unwind.', 'Entertainment');

INSERT INTO activity_item (name, description, type) VALUES
('Watch a scary movie', 'Watching a scary movie can be thrilling and exciting.', 'Entertainment');

INSERT INTO activity_item (name, description, type) VALUES
('Go for a run', 'Running is a great way to stay fit and healthy.', 'Sports');

INSERT INTO activity_item (name, description, type) VALUES
('Eat a burger', 'Eating a burger is a delicious treat.', 'Food');