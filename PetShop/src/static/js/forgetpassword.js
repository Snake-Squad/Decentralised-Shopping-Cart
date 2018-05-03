function onClickForget() {
  alert("forget_password");
  
  var config = {
    apiKey: "AIzaSyBzvcZDres2eUAUX6PBHRlo858ftMznDKs",
    authDomain: "comp9900-4b79d.firebaseapp.com",
    databaseURL: "https://comp9900-4b79d.firebaseio.com",
    projectId: "comp9900-4b79d",
    storageBucket: "comp9900-4b79d.appspot.com",
    messagingSenderId: "445311599888"
  };
  firebase.initializeApp(config);
   
  //window.location.href="index.html";
  // get user's email and password from the webpage
  var username = document.getElementById("username").value;
  
  if(username.length==0)
  {
      alert("Username cannot be empty, please input");
      window.location.href="login.html";
  }
  // get the database
  var users = firebase.database().ref().child('users');
  //alert(users);

  // // This must be the last function of all
  var isValid = true;
  users.on("value", function(snapshot) {
    var isValid = false;
    console.log("---")

    snapshot.forEach(function(user) {
      // retrieve data from db
      var userKey = user.key; // user id
      var userVal = user.val(); // user's info (email, fn, ln, pw, role)
      
      alert(userVal.email);
      //check whether it matches or not
      if (userVal.email == username) {       
          isValid = true;
          return true;
      }
      });
    alert(isValid);
    });
    
    if (isValid) {

      window.location.replace("forget_password.html");
    } else {
      alert("Username doesn't exist, please input again");
      window.location.href="login.html";
    }
  
  

}