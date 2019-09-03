## Install Dependencies
Install dependencies with  `npm install`

## Start Project
Run `npm start` to start project.

## Build 
Run `npm run build` to build project.
 

## Database Setup
Edit database setup config in `user-verifcation/src/repository/database.js` file
<br/>
eg:
<br/>
const pool = mysql.createConnection({
    <br/>
    host: 'localhost',
    <br/>
    database: 'demodb',
    <br/>
    user: 'root',
    <br/>
    password: 'root'
    <br/>
});



##  API documentation
Run `swagger project edit` to edit api docs.
<br/>
Note:
if you want to see api documentation, copy swagger.yaml from `user-verifcation/api/swagger/swagger.yaml` file and paste in `editor.swagger.io` 
<br/> 
or
<br/>
you can also copy swagger.json from `user-verifcation/api/swagger/swagger.json` file and paste in `editor.swagger.io`
