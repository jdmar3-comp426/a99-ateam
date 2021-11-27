// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
var db = new Database('src/user.db');

// const score_db = new Database('src/score.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your user database appears to be empty. Initializing it now.');
// Set a const that will contain your SQL commands to initialize the database.
// Include constraint that user must be unique
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, pass TEXT, email TEXT, name TEXT, year TEXT, score TEXT, unique(user) );
		INSERT INTO userinfo (user, pass, email, name, year, score) VALUES ('admin','bdc87b9c894da5168059e00ebffb9077', 'admin@test.com', 'Sam Anthony', '2023', '0');
        INSERT INTO userinfo (user, pass, email, name, year, score) VALUES ('test1','12345678', 'test1@test.com', 'Test One', '2020', '0');
        INSERT INTO userinfo (user, pass, email, name, year, score) VALUES ('test2','23456789', 'test2@test.com', 'Test Two', '2029', '10');
        INSERT INTO userinfo (user, pass, email, name, year, score) VALUES ('test3','34567890', 'test3@test.com', 'Test Three', '2025', '1');
        INSERT INTO userinfo (user, pass, email, name, year, score) VALUES ('test4','45678901', 'test4@test.com', 'Test Four', '2022', '0');
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and three entries containing a username, email address, password, and initial high score of 0.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db