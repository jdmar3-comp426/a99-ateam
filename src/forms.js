window.addEventListener("load", function () {
    //  Global User Vars
    var thisUser = null;
    var loggedIn;

    // Hide and show elements based on login status
    function hideElements(){
        document.getElementById("loggedInUser").classList.add("hide-on-logout");
        document.getElementById("scorebox").classList.add("hide-on-logout");
        document.getElementById("scoreboard").classList.add("hide-on-logout");
        document.getElementById("game").classList.add("hide-on-logout");
        document.getElementById("signupdiv").classList.remove("hide-on-logout");
        document.getElementById("loginmessage").classList.remove("hide-on-logout");
        document.getElementById("credentials").classList.remove("hide-on-logout");
    }
    function showElements(){
        document.getElementById("loggedInUser").classList.remove("hide-on-logout");
        document.getElementById("scorebox").classList.remove("hide-on-logout");
        document.getElementById("scoreboard").classList.remove("hide-on-logout");
        document.getElementById("game").classList.remove("hide-on-logout");
        document.getElementById("signupdiv").classList.add("hide-on-logout");
        document.getElementById("loginmessage").classList.add("hide-on-logout");
        document.getElementById("credentials").classList.add("hide-on-logout");
    }

    // Remove this line to show elements at start before login during testing
    hideElements();
    

    // New User Creation
    function sendData( form ) {
        const sendRequest = new XMLHttpRequest();
        const signupInfo = new URLSearchParams(new FormData( form ));
        sendRequest.addEventListener("error", function(event){
            alert('Submission unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function(event){
            alert('Your account was created!');
        });
        sendRequest.open("POST", "http://localhost:5000/app/new/user");
        sendRequest.send( signupInfo );
    }

    function newUserValid() {
        if(document.getElementById("signup").user.value == "" | document.getElementById("signup").email.value == "" | document.getElementById("signup").pass.value == ""){
            return false;
        } else {
            return true;
        }
    }

    const newuser = document.getElementById("signup");
    newuser.addEventListener("submit", function(event){
        event.preventDefault();
        if(newUserValid()){
            sendData(this);
        } else {
            alert("Username, Email, and Password are Required!")
        }
        
    });

    // Delete User
    function deleteData( form ) {
        var deletePassword = form.pass.value;
        let deleteInfo = new URLSearchParams("");
        deleteInfo.append('user', thisUser.user);
        deleteInfo.append('pass', deletePassword);
        const sendRequest = new XMLHttpRequest();
        sendRequest.addEventListener("error", function(event){
            alert('Deletion unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function(event){
            // alert('Your account was deleted!');
        });

        sendRequest.open("DELETE", "http://localhost:5000/app/deleting/user");
        sendRequest.send( deleteInfo );
    }

    const olduser = document.getElementById("delete");
    olduser.addEventListener("submit", function(event){
        event.preventDefault();
        deleteData(this);
    });

    // Updating User
    function updateData( form ) {
        const sendRequest = new XMLHttpRequest();
        var updateInfo = new URLSearchParams(new FormData( form ));
        updateInfo.append('user', thisUser.user);
        sendRequest.addEventListener("error", function(event){
            alert('Changes were unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function(event){
            // alert('Your username was changed!');
        });
        sendRequest.open("PATCH", "http://localhost:5000/app/updating/user");
        sendRequest.send( updateInfo );
    }

    const updateUser = document.getElementById("changeName");
    updateUser.addEventListener("submit", function(event){
        event.preventDefault();
        updateData(this);
    });


    // Get List of Users
    // function getUsers( form ) {
    //     const sendRequest = new XMLHttpRequest();
    //     sendRequest.addEventListener("error", function(event){
    //         alert('Accessing users unsuccessful! Please try again.');
    //     });

    //     sendRequest.onreadystatechange = function() {
    //         if (this.readyState == 4 && this.status == 200) {
    //             // alert(sendRequest.responseText);
    //             document.getElementById("allUsers").innerHTML = sendRequest.responseText;
    //         }
    //     }
    //     sendRequest.open("GET", "http://localhost:5000/app/users");
    //     sendRequest.send();        
    // };

    // const allUsers = document.getElementById("usersButton");
    // allUsers.addEventListener("click", function(event){
    //     event.preventDefault();
    //     getUsers(this)
    // });


    // Login
    function getUserdata( form ) {
        const sendRequest = new XMLHttpRequest();
        const userInfo = new URLSearchParams(new FormData( form ));
        sendRequest.addEventListener("error", function(event){
            alert('Accessing users unsuccessful! Please try again.');
        });

        sendRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                thisUser = JSON.parse(sendRequest.response);
                if(loggedIn){
                    thisUser = null;
                    loggedIn = false;
                    document.getElementById("login").value = "Login";
                    document.getElementById("greeting").innerHTML = thisUser;
                    // document.getElementById("loggedInUser").classList.add("hide-on-logout");
                    hideElements()
                    alert("Logging Out");
                } else {
                    if(thisUser.name == null | thisUser.name == ""){
                        document.getElementById("greeting").innerHTML = "Welcome to Whack-a-Devil, " + thisUser.user;
                    } else {
                        document.getElementById("greeting").innerHTML = "Welcome to Whack-a-Devil, " + thisUser.name;
                    };
                    document.getElementById("login").value = "Logout";
                    loggedIn = true;
                    // document.getElementById("loggedInUser").style.display = "block";
                    // document.getElementById("loggedInUser").classList.remove("hide-on-logout");
                    showElements();
                    alert("Login successful!")
                }
            }
        }
        sendRequest.open("POST", "http://localhost:5000/app/login/user");
        sendRequest.send( userInfo );
    };

    const selfUser = document.getElementById("loginForm");
    selfUser.addEventListener("submit", function(event){
        event.preventDefault();
        if(loggedIn){
            alert("Logging Out");
            // document.getElementById("loggedInUser").classList.add("hide-on-logout");
            hideElements()
            thisUser = null;
            loggedIn = false;
            document.getElementById("login").value = "Login";
            document.getElementById("greeting").innerHTML = thisUser;
            this.reset();
        } else {
            getUserdata(this);
        }
    });

    // Show Profile
    const showData = document.getElementById("showData");
    showData.addEventListener("click", function(event){
        event.preventDefault();
        if(loggedIn){
            document.getElementById("profileData").innerHTML = `Username: ${thisUser.user}, 
            Email: ${thisUser.email}, 
            Name: ${thisUser.name},
            Year: ${thisUser.year}`
        } else {
            alert("You must log in to see profile!")
        }
    });

    // Update score after each time and display the highest score 
    function updateScore( form ) {
        const sendRequest = new XMLHttpRequest();
        var updateInfo = new URLSearchParams(new FormData( form ));
        updateInfo.append('score', score);
        sendRequest.addEventListener("error", function(event){
            alert('Changes were unsuccessful! Please try again.');
        });
        sendRequest.addEventListener("load", function(event){
            // alert('Your score was changed!');
        });
        sendRequest.open("PATCH", "http://localhost:5000/app/new/score");
        sendRequest.send( updateInfo );
    }
    const update_Score = document.getElementById("showScore");
    update_Score.addEventListener("click", function(event){
        event.preventDefault();
        updateScore(this);
    });

    // retrieve the highest score from database
    function getHighest( form ) {
        const sendRequest = new XMLHttpRequest();
        sendRequest.addEventListener("error", function(event){
            alert('updating score unsuccessful! Please try again.');
        });

        sendRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // alert(sendRequest.responseText);
                document.getElementById("showScore").innerHTML = sendRequest.responseText;
            }
        }
        sendRequest.open("GET", "http://localhost:5000/app/user/highest");
        sendRequest.send(); 
    }

 

    
});    
