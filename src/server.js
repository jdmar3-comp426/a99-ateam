// Define app using express
var express = require("express");
var app = express();

// Require database SCRIPT files
var db = require("./database.js");

var scoreboard = require("./score_database.js");

// Require md5 MODULE
var md5 = require("md5");

// Require CORS module
var cors = require("cors");

// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make Express use CORS
app.use(cors());

// Set server port
var HTTP_PORT = 5000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/user", (req, res, next) => {
	var data = {
		user: req.body.user,
		email: req.body.email,
		pass: req.body.pass ? md5(req.body.pass) : null,
		name: req.body.name, 
		year: req.body.year
	}
	const stmt = db.prepare('INSERT INTO userinfo (user, pass, email, name, year) VALUES (?, ?, ?, ?, ?)');
	const info = stmt.run(data.user, data.pass, data.email, data.name, data.year);
	res.status(201).json({"message":info.changes+" record created: ID "+info.lastInsertRowid+" (201)"});
})

// CREATE a new score (HTTP method POST) at endpoint /app/new/score               ******not working
app.post("/app/new/score", (req, res) => {
	var data = {
		user: req.body.user,
		name: req.body.name, 
		score: req.body.score
	}
	const stmt = scoreboard.prepare('INSERT INTO scoreboard (user, name, score) VALUES (?, ?, ?)');
	const info = stmt.run(data.user, data.name, data.score);
	res.status(201).json({"message":info.changes+" score record created: ID "+info.lastInsertRowid+" (201)"});
})

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});


// READ a list of all score data (HTTP method GET) at endpoint /app/scores/  **** not working
app.get("/app/scores", (req, res) => {	
	const stmt = scoreboard.prepare("SELECT * FROM scoreboard").all();
	res.status(200).json(stmt);
});


// READ a list of one user that has the highest score (HTTP method GET) at endpoint /app/user/highest
app.get("/app/user/highest", (req, res) => {	
	const stmt = scoreboard.prepare("SELECT name, score FROM scoreboard ORDER BY score DESC LIMIT 5;").get();
	res.status(200).json(stmt);
});

//SELECT id, num1 + num2 AS total FROM table1 ORDER BY num1 + num2 DESC LIMIT 5

// UPDATE a single user (HTTP method PATCH) at endpoint /app/updating/user/
app.patch("/app/updating/user", (req, res) => {
	var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass) : null,
		newuser: req.body.newuser
	}
	const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user) WHERE user = ? AND pass = ?")
	const info = stmt.run(data.newuser, data.user, data.pass)
	res.status(200).json({"message":`1 record updated: User ${data.user} (200)`});
});


// DELETE a single user by username and password (HTTP method DELETE) at endpoint /app/deleting/user
app.delete("/app/deleting/user", (req, res) => {
    var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass) : null
	}
	const stmt = db.prepare("DELETE FROM userinfo WHERE user = ? AND pass = ?")
    const info = stmt.run(data.user, data.pass);
	res.status(200).json({"message":`1 record deleted: User ${data.user} (200)`});
});


// READ a single user (HTTP method GET) at endpoint /app/login/user
app.post("/app/login/user", (req, res) => {	
    var data = {
		user: req.body.user,
		pass: req.body.pass ? md5(req.body.pass) : null
	}
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?").get(data.user, data.pass);
	res.status(200).json(stmt);
});


// READ a single user (HTTP method GET) at endpoint /app/exists/user
app.post("/app/exists/user", (req, res) => {	
    var data = {
		user: req.body.user
	}
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(data.user);
	res.status(200).json(stmt);
});

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Your API is working!"});
    res.status(404);
});
