function addCookie(name, username, uid, days, path) {
  var name = escape(name);  
  var username = escape(username);  
  var uid = escape(uid);
  var expires = new Date();  
  expires.setTime(expires.getTime() + days * 3600000 * 24);  
  //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
  path = path == "" ? "" : ";path=" + path;  
  //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
  //参数days只能是数字型  
  var _expires = 
    (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
  document.cookie = name + "=" + [username, uid] + _expires + path;  
  console.log(document.cookie);
}  


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
                if (userVal.password == password) {
                isValid = true;
                userId = userVal.user_id;
                return true; // break the loop
                }
            }
        });
        // alert(isValid);
        if (isValid) {
            addCookie("userName", username, userId, 7, "/");
            window.location.replace("/");
        } else {
            alert("Email or password is not correct, please input again");
            window.location.href="login.html";
        }
    });
}
