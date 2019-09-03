## Install Dependencies
install dependencies with  `npm install`

## Start Project
Run `npm start` to start project.

## Build 
Run `npm run build` to build project.
 

## Database setup
edit database setup config in repository/database.js file
eg:
const pool = mysql.createConnection({
    host: 'localhost',
    database: 'demodb',
    user: 'root',
    password: 'root'
});



##  API documentation
Run `swagger project edit` to edit api docs.
Note:
if you want to see api documentation. copy swagger.yaml from `src/api/swagger.yaml` file. and paste in `editor.swagger.io` or 
you can copy swagger.json from `src/api/swagger.json` file. and paste in `editor.swagger.io`
