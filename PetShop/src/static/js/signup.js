function addCookie(name, value, days, path){   /**添加设置cookie**/  
    var name = escape(name);  
    var value = escape(value);  
    var expires = new Date();  
    expires.setTime(expires.getTime() + days * 3600000 * 24);  
    //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
    path = path == "" ? "" : ";path=" + path;  
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
    //参数days只能是数字型  
    var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + value + _expires + path;  
}  


function setOnFirebase(
  userIdBC,
  username, firstName, lastName, password, 
  street, suite, country, state, zip
) {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBzvcZDres2eUAUX6PBHRlo858ftMznDKs",
    authDomain: "comp9900-4b79d.firebaseapp.com",
    databaseURL: "https://comp9900-4b79d.firebaseio.com",
    projectId: "comp9900-4b79d",
    storageBucket: "comp9900-4b79d.appspot.com",
    messagingSenderId: "445311599888"
  };
  firebase.initializeApp(config);

  var users = firebase.database().ref().child('users');
  var userIdFB = firebase.database().ref().child('users').push().key;
  alert(userIdFB);
  
  return users.child(userIdFB).set({
    "email": username, 
    "password": password,
    "first_name": firstName,
    "last_name":lastName,
    "street": street, 
    "suite": suite, 
    "country": country, 
    "state": state,
    "zip": zip,
    "user_id": userIdBC
  }).then(function(result) {
    return setUserOnBlockChain(userIdBC);
  });
}


function setUserOnBlockChain(userIdBC) {
  alert("set a user on block chain");
  window.location.replace("/signup.html");
}


function validSignUp() {
  // get personal information from the webpage
  var username = document.getElementById("email").value.trim();
  var firstName = document.getElementById("first_name").value.trim();
  var lastName = document.getElementById("last_name").value.trim();
  var password = document.getElementById("psw").value.trim();
  var confirmPassword = document.getElementById("psw-repeat").value.trim();
  
  // get mailing address from the webpage
  var street = document.getElementById("address1").value.trim();
  var suite = document.getElementById("address2").value.trim();
  var countries = document.getElementById("country");
  var cid = countries.selectedIndex ;             // country_Index is the index user choose
  var country = countries.options[cid].text;
  var states = document.getElementById("state");
  var sid = states.selectedIndex;
  var state = states.options[sid].text; 
  var zip = document.getElementById("zip").value.trim();

  // alert(countries.options[cid].text);
  if (password != confirmPassword) {
    alert("Password and confirm password are not same, sign up again");
  }
  else {
    var userIdBC = generateUserIdBC();
    setOnFirebase(
      userIdBC,
      username, firstName, lastName, password, 
      street, suite, country, state, zip
    );
    //addCookie("userName", username, 7, "/");
    
  }
}



