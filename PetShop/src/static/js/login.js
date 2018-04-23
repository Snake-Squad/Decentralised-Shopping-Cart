function checkLogin() {
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
  alert(users);

  // This must be the last function of all
  users.on("value", function(snapshot) {
    var isValid = false;

    snapshot.forEach(function(user) {
      // retrieve data from db
      var userKey = user.key; // user id
      var userVal = user.val(); // user's info (email, fn, ln, pw, role)
      
      alert(userVal.email);
      // check whether it matches or not
      if (userVal.email == username) {
        if (userVal.password == password) {
          isValid = true;
          return true;
        }
      }
    });
    alert(isValid);
    if (isValid) {
      window.location.replace("/");
    } else {
      window.location.replace("/");
    }
  });

}
