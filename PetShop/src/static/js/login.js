function onClickCheckLogin() {
    alert(" onClickCheckLogin ")
     //  Initialize Firebase
    var config = {
        apiKey: "AIzaSyBzvcZDres2eUAUX6PBHRlo858ftMznDKs",
        authDomain: "comp9900-4b79d.firebaseapp.com",
        databaseURL: "https://comp9900-4b79d.firebaseio.com",
        projectId: "comp9900-4b79d",
        storageBucket: "comp9900-4b79d.appspot.com",
        messagingSenderId: "445311599888"
    };
    firebase.initializeApp(config);

    // get user's email and password from the webpage
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // get the database
    var users = firebase.database().ref().child('users');

    
    // This must be the last function of all
    users.on("value", function(snapshot) {
        var isValid = false;
        var userId = "";            // this id is used in blockchain
        
        snapshot.forEach(function(user) {
            // retrieve data from db
            var userKey = user.key;   // user id
            var userVal = user.val(); // user's info (email, fn, ln, pw, role)
          
            
            // check whether it matches or not
            if (userVal.email == username) {
                
                //alert(userVal.email);
                if (userVal.password == password) {
                //alert(userVal.password);
                isValid = true;
                userId = userVal.user_id;
                return true; // break the loop
                }
            }
        });
        alert(isValid);
        if (isValid) {
            addCookie("userName", username, userId, 7, "/");
            window.location.replace("/");
        } else {
            alert("Email or password is not correct, please input again");
            window.location.href="login.html";
        }
    });
}

function onClickForget(){
    //alert("forget password--------------in login.js");
     //  Initialize Firebase
    var config = {
        apiKey: "AIzaSyBzvcZDres2eUAUX6PBHRlo858ftMznDKs",
        authDomain: "comp9900-4b79d.firebaseapp.com",
        databaseURL: "https://comp9900-4b79d.firebaseio.com",
        projectId: "comp9900-4b79d",
        storageBucket: "comp9900-4b79d.appspot.com",
        messagingSenderId: "445311599888"
    };
    firebase.initializeApp(config);

    // get user's email and password from the webpage
    var username = document.getElementById("username").value;
    var checkUser=1;
    if(username==""){
        checkUser=0;
        alert("username cannot be empty");
        window.location.replace("login.html");
    }
    if(checkUser==1)
    {
        var users = firebase.database().ref().child('users');

        
        // This must be the last function of all
        users.on("value", function(snapshot) {
            var isValid = false;
            var userId = "";            // this id is used in blockchain
            
            snapshot.forEach(function(user) {
                // retrieve data from db
                var userKey = user.key;   // user id
                var userVal = user.val(); // user's info (email, fn, ln, pw, role)
              
                
                // check whether it matches or not
                if (userVal.email == username) {
                    isValid = true;
                    //alert("find the username");
                    addCookie("userName", username, userVal.user_id, 7, "/");
                    console.log(getCookieValue("userName")[0]);
                    window.location.replace("forget_password.html");

                }
            });
            //alert(isValid);
            if (!isValid) {
                alert("No such user in the DB, please check your username");
                window.location.href="login.html";
            }
        });
    }
}

