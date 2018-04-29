Controller = {
  web3Provider: null,
  contracts: {},

  initWeb3: function(userId) {
    alert("initWeb3" + " " + userId);
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      Controller.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      Controller.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(Controller.web3Provider);
    // alert("web3 Initialized");
    return Controller.initContract(userId);
  },

  initContract: function(userId) {
    $.getJSON('Controller.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      Controller.contracts.Controller = TruffleContract(data);
      // Set the provider for our contract
      Controller.contracts.Controller.setProvider(Controller.web3Provider);
      // Use our contract to retrieve and mark the adopted pets
      return Controller.login(userId);
    }); 
  },

  login: function(userId) {
    alert(userId);
  }
};

function addCookie(name, value, days, path) {   /**添加设置cookie**/  
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

// function getCookieValue(name) {   
//   var name = escape(name);  
//   var allcookies = document.cookie;         
//   name += "=";  
//   var pos = allcookies.indexOf(name);      

//   if (pos != -1) {                                             
//     var start = pos + name.length;                 
//     var end = allcookies.indexOf(";",start);        
//     if (end == -1) end = allcookies.length;        
//     var value = allcookies.substring(start,end);  
//     return (value);                              
//   } else{  
//     return "";  
//   } 
// }

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
          return true;          // break the loop
        }
      }
    });
    // alert(isValid);
    if (isValid) {
      addCookie("userName",username,7,"/");
      // add this user to the block chain
      // alert("cookie added")
      // alert(userId)
      Controller.initWeb3(userId);
      window.location.replace("/");
    } else {
      alert("Email or password is not correct, please input again");
      window.location.href="login.html";
    }
  });
}
