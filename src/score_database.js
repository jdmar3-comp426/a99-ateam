// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
var scoreboard = new Database('src/scoreboard.db');

// Is the database initialized or do we need to initialize it?
const stmt = scoreboard.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='scoreboard';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your scoreboard database appears to be empty. Initializing it now.');
// Set a const that will contain your SQL commands to initialize the database.
// Include constraint that user must be unique
    const sqlInit = `
        CREATE TABLE scoreboard ( id INTEGER PRIMARY KEY, user TEXT, name TEXT, score TEXT);
		INSERT INTO scoreboard (user, name, score) VALUES ('admin','Sam Anthony', '0');
    `;
// Execute SQL commands that we just wrote above.
    scoreboard.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and three entries containing a username, name, and initial high score of 0.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = scoreboard