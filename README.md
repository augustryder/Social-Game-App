# Social-Game-App
Social Game web app for CSCI-3321

## Setup

To set up the project, follow these steps:

1. Install Node.js and MySQL
2. Clone repository
```sh
git clone https://github.com/augustryder/Social-Game-App.git
cd Social-Game-App
```
3. Install the necessary dependencies:
    ```sh
    npm install
    ```
4. Create a .env file with your MySQL database credentials
```
# Social-Game-App/.env

DB_HOST=localhost
DB_NAME=social_game_db
DB_USER=[your credentials]
DB_PASSWORD=[your credentials]
```

5. Run create_and_populate.sql to create and initialize the database
```sh
mysql -u [username] -p [password] < create_and_populate.sql
```

6. Run application
```sh
node app.js
```

7. Go to http://localhost:3000

#### For API documentation, go to http://localhost:3000/api-docs

## Directory Structure
app.js - Main app file  

public - contains client-side js and css and images

views/pages - contains ejs pages  

views/partials - contains ejs partials  

routers - contains js files for routing requests  

controllers - contains the logic for communicating with the db and fulfilling the requests  

models - database connection and logic  

middleware - js session logic


![image](https://github.com/user-attachments/assets/215c188c-529e-4db0-a22e-340759f8597f)
