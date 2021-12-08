# Back-End Planning

## User Database
Users can:
- create profile
- update profile
- delete profile
- view profile

Required Infomation:
- Username
- Email Address
- Password

Optional Information collected:
- Full Name
- UNC Year

Can be changed:
- Username (must have old username and password)
- Email (must have username and password)
- Optional Info (must have username and password)

## Layout
WHEN LOGGED IN:
- Logout, Delete, Show Profile, Change Username

WHEN LOGGED OUT:
- Login, Signup

## Explaination of Code
**index.html** is the entry point that has forms for Login/Logout, Sign Up, viewing all User's and their data, Deleting User, showing Profile, and Changing username.
- Login will stay and be styled and changes between login/logout based on status which is tracked by global var loggedIn in forms.js
- Sign Up should also stay if the user is logged in and hide if not
- Viewing all user's data is for testing only and should be removed immediately
- Deleting users will delete own user when logged in and requires password to confirm
- Showing profile should stay, but only be visible when logged in
- Changing username should stay, only visible when logged in

**database.js** creates the SQLite database with fields for
- Username (required, must be unique)
- Password (required)
- Email (required)
- Name
- Year

**forms.js** is the script linked from the index.html file. There are functions for each of the forms and actions listed in index.html and gloabl variables.
- thisUser (var of current user data when logged in)
- loggedIn (boolean var of if the user is logged in)
- New User Creation
- Delete User
- Updating User
- Get List of Users (**should be removed in final**)
- Login
- Show Profile

**server.js** has CRUD API endpoints using express.js and better-sqlite3 to do all of the functions above.