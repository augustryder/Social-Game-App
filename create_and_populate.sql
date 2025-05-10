
-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS social_game_db;
USE social_game_db;

-- Create and populate tables and stuff

-- Creating the base user table
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
    image VARCHAR(255) NULL
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
    FOREIGN KEY (a_id) REFERENCES activity_item(a_id)
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
('Rex "The Flex" Thompson', 'Rex is basically a protein shake in the shape of a man. He lives by three rules: Lift heavy, eat big, and never skip arm day. His wardrobe consists exclusively of gym tanks, and his biceps have their own gravitational pull. He speaks almost entirely in gym metaphors, referring to life’s challenges as "mental PRs" and bad days as "rest days for the soul." Despite his meathead persona, he''s surprisingly wholesome—his ultimate dream isn’t just to be swole, but to help others be swole too. If you need a spot at the gym or an overenthusiastic pep talk, Rex is your guy. Just don’t ask him to stop flexing in every reflective surface.', 'rex.png');

INSERT INTO characters (name, description, image) VALUES
('Harvey Greene, PhD', 'Dr. Harvey Green is a revered philosophy professor at a prestigious liberal arts university, known for his insightful lectures and packed office hours. He’s a kind and quiet soul, and he spends most of his time buried in books, contemplating life''s great mysteries.
But one night, at a late-night departmental mixer, he let slip a secret! Before academia, he was Howl, the enigmatic frontman of Midnight Manifesto, an internationally beloved cult rock band.
These days, he’s traded guitars for books, volunteering at the local library and curating reading lists with the same passion he once poured into lyrics. He insists his rockstar days are behind him, but if you listen closely, you might catch him humming an old tune.', 'harvey.png');

INSERT INTO characters (name, description, image) VALUES
('Kieran Garvey', 'Kieran is a chef, self-proclaimed "foodie", and a master of the culinary arts. He spends his days experimenting with flavors, whipping up gourmet dishes, and sharing his culinary creations on social media. With a passion for all things delicious, Kieran is always on the lookout for the next big food trend. He has a knack for turning even the simplest ingredients into mouthwatering masterpieces. When he''s not in the kitchen, you can find him exploring local farmers'' markets or hunting down the best food trucks in town. Kieran believes that food is not just sustenance; it''s an experience to be savored and shared.', 'kieran.png');

INSERT INTO characters (name, description, image) VALUES
('Madame Eloise', 
'Madame Eloise is a self-proclaimed clairvoyant who operates out of a converted garden shed behind a gas station. Draped in flowing scarves and surrounded by an overwhelming number of incense sticks, she offers tarot readings, aura cleansings, and unsolicited advice about your love life. Her crystal ball is actually a snow globe from Niagara Falls, but she insists it still "channels vibes." She’s uncannily accurate about weirdly specific things—like when you’d lose your left sock or bump into your ex at the worst possible moment. Is she truly psychic? Who knows. But for $5 and a cup of chamomile tea, she’ll tell you your future, your past, and probably what you had for breakfast.', 
'eloise.png');

INSERT INTO characters (name, description, image) VALUES
('The Ghost of Gary',
'The Ghost of Gary is a spectral figure who haunts the local library, eternally searching for his misplaced library card. He’s not a scary ghost; in fact, he’s more of a bumbling apparition who keeps knocking over bookshelves and accidentally scaring the librarian. Gary was once a passionate bookworm, and now he spends his afterlife trying to get people to read more. He often appears during late-night study sessions, offering unsolicited book recommendations and ghostly high-fives. If you’re lucky, he might even help you find that one book you’ve been searching for—if only he could remember where he put it.',
'ghost.png');



-- POPULATE ACTIVITY TYPES

INSERT INTO activity_type (name, image) VALUES
('Food', 'food.png');

INSERT INTO activity_type (name, image) VALUES
('Entertainment', 'entertainment.png');

INSERT INTO activity_type (name, image) VALUES
('Sports', 'sports.png');

INSERT INTO activity_type (name, image) VALUES
('Crafts', 'crafts.png');

INSERT INTO activity_type (name, image) VALUES
('Music', 'music.png');

-- POPULATE ACTIVITY ITEMS

INSERT INTO activity_item (name, description, type) VALUES
('Cooking', 'The art of preparing food, often involving a variety of techniques and ingredients.', 'Food');

INSERT INTO activity_item (name, description, type) VALUES
('Watching TV', 'The act of viewing television shows or movies for entertainment.', 'Entertainment');

INSERT INTO activity_item (name, description, type) VALUES
('Clubbing', 'Going out to a nightclub to dance, socialize, and enjoy music.', 'Entertainment');

INSERT INTO activity_item (name, description, type) VALUES
('Reading', 'The act of looking at and comprehending written text.', 'Entertainment');

INSERT INTO activity_item (name, description, type) VALUES
('Working out', 'Engaging in physical exercise to improve fitness and health.', 'Sports');

INSERT INTO activity_item (name, description, type) VALUES
('Attending a concert', 'Going to a live music performance to enjoy the experience of music in person.', 'Music');

INSERT INTO activity_item (name, description, type) VALUES
('Reading tarot cards', 'The practice of using tarot cards to gain insight into the past, present, or future.', 'Crafts');

INSERT INTO activity_item (name, description, type) VALUES
('Knitting', 'The craft of creating fabric by interlocking loops of yarn with needles.', 'Crafts');

INSERT INTO activity_item (name, description, type) VALUES
('Woodworking', 'The craft of creating objects from wood, often involving cutting, shaping, and joining.', 'Crafts');

INSERT INTO activity_item (name, description, type) VALUES
('Gardening', 'The practice of cultivating plants and flowers in a garden.', 'Crafts');

INSERT INTO activity_item (name, description, type) VALUES
('Playing guitar', 'The act of playing the guitar, often for personal enjoyment or performance.', 'Music');

INSERT INTO activity_item (name, description, type) VALUES
('Playing piano', 'The act of playing the piano, often for personal enjoyment or performance.', 'Music');

INSERT INTO activity_item (name, description, type) VALUES
('Tennis', 'A sport played with rackets and a ball, typically on a court.', 'Sports');

INSERT INTO activity_item (name, description, type) VALUES
('Football', 'American football, a team sport played with an oval ball on a field.', 'Sports');

INSERT INTO activity_item (name, description, type) VALUES
('Baking', 'The act of cooking food by dry heat, typically in an oven.', 'Food');

INSERT INTO activity_item (name, description, type) VALUES
('Dancing', 'The act of moving rhythmically to music, often in a social setting.', 'Entertainment');



-- PREFERENCES (LIKES)

INSERT INTO preferences (c_id, a_id, value) VALUES
(1, 2, 1); -- Chadwick likes watching TV

INSERT INTO preferences (c_id, a_id, value) VALUES
(1, 14, 2); -- Chadwick loves soccer

INSERT INTO preferences (c_id, a_id, value) VALUES
(2, 1, 2); -- Luna loves cooking

INSERT INTO preferences (c_id, a_id, value) VALUES
(2, 6, 1); -- Luna likes attending concerts

INSERT INTO preferences (c_id, a_id, value) VALUES
(3, 3, 2); -- Glorp and Zorp love clubbing

INSERT INTO preferences (c_id, a_id, value) VALUES
(4, 4, 1); -- Bella likes reading

INSERT INTO preferences (c_id, a_id, value) VALUES
(4, 15, 2); -- Bella loves baking

INSERT INTO preferences (c_id, a_id, value) VALUES
(5, 5, 2); -- Rex loves working out

INSERT INTO preferences (c_id, a_id, value) VALUES
(6, 11, 2); -- Harvey loves playing guitar

INSERT INTO preferences (c_id, a_id, value) VALUES
(6, 4, 1); -- Harvey likes reading

INSERT INTO preferences (c_id, a_id, value) VALUES
(7, 1, 2); -- Kieran loves cooking

INSERT INTO preferences (c_id, a_id, value) VALUES
(8, 7, 2); -- Eloise loves reading tarot cards

INSERT INTO preferences (c_id, a_id, value) VALUES
(8, 13, 2); -- Eloise likes tennis

INSERT INTO preferences (c_id, a_id, value) VALUES
(9, 4, 2); -- Gary loves reading

INSERT INTO preferences (c_id, a_id, value) VALUES
(9, 9, 1); -- Gary likes woodworking


-- PREFERENCES (DISLIKES)

INSERT INTO preferences (c_id, a_id, value) VALUES
(1, 1, -1); -- Chadwick dislikes cooking

INSERT INTO preferences (c_id, a_id, value) VALUES
(2, 5, -1); -- Luna dislikes working out

INSERT INTO preferences (c_id, a_id, value) VALUES
(4, 6, -2); -- Bella hates attending concerts

INSERT INTO preferences (c_id, a_id, value) VALUES
(7, 2, -1); -- Kieran dislikes watching TV

INSERT INTO preferences (c_id, a_id, value) VALUES
(8, 1, -1); -- Eloise dislikes cooking

INSERT INTO preferences (c_id, a_id, value) VALUES
(9, 5, -1); -- Gary dislikes working out

INSERT INTO preferences (c_id, a_id, value) VALUES
(5, 4, -2); -- Rex hates reading

INSERT INTO preferences (c_id, a_id, value) VALUES
(6, 3, -1); -- Harvey dislikes clubbing

INSERT INTO preferences (c_id, a_id, value) VALUES
(3, 8, -1); -- Glorp and Zorp dislike reading tarot cards