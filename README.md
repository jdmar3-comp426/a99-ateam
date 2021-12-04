# Whack-a-Devil

demo: https://youtu.be/NAAmeuHo6Sc

**Dependencies**:
- better-sqlite3
- browser-sync
- concurrently
- cors
- express
- md5

**How to Run**: npm run start

find details on
- back end user databases
- changes
- planning 
in **docs**

**The Game**
The game is a modified version of "Whack a Mole"

**Sign up**
Create your profile in the sign up section if you don't already have an account

**Login**
Login with registered username and password

**Gameplay**
Once loggged in, you will be directed to the game itself. 
The game is a modified version of "Whack a Mole" with a 60 sec countdown.
You receive one score by clicking on the devil img
Your goal is to score as high as possible

**Features**
Show High Score: when you click this button, the highest score shows up with the name of the player
Save Score: when clicked, saves your current score
Change Username: when clicked, changes your username and logs you out
Delete Account: when clicked, deletes your account permanently
View Profile: view profile details, including: User, User Name, Email, and Year

HOW IT WORKS

**Front end**
The front end development and styling of the interface was done using Bulma. We added divs and classes to index.html so that we could create separation in the "Create An Account", "Change Username", and "Delete Account" parts using boxes. We also added styling through using different fonts, colors, and spacing to make our interface more appealing to the user. The Whack-A-Devil gameboard was also altered using Bulma to have Carolina Blue background instead of it's original formatting in black and white.

**Gameplay**
You are given 60 seconds to hit the Duke devil as many times as you can. At the end of the 60 seconds, you score is outputted

**Back end**
Both the back-end databases were created using Sqlite-3, md5, and express, as done in assignments 4 and 5. CRUD API endpoints were created for each of the user and score functions defined above. 

- User database
Using input forms and buttons, users made HTTP requests to the database to access, update, and delete their info. The database, user.db, has 5 parameters: username, password, email, name, and year in school. Of these, username, password, and email are required for each new account. Additionally, changes had to be made in the database to require that each username was unique, so there could be no duplicate users. The API endpoints had functions to create a new user, log in, view user info, change username, delete account, and log out of account. The back end user database files also had scripts to manage which sections of the website were shown based on the log in status. Further documentation of this database and its associated functions can be found within the src folder's files of database.js, forms.js, and server.js, or in the back-end-userdatabase.md file in the docs folder.

- Score database
The scoreboard database is created along with the user database. The score database consists of two fields: Name and Score. 
When the "Get Highest Score" button is clicked, the "getHighest()" function in forms.js sends a request to the server, accessing the http://localhost:5000/app/user/highest endpoint, pulling the highest score and the name of the player from the scoreboard database.
When the "Save Score" button is clicked, the "saveScore()" function in forms.js sends a request to the server, accessing the http://localhost:5000/app/new/score endpoint, saving your current score and your name into the scoreboard database