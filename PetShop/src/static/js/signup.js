Controller = {
    web3Provider: null,
    contracts: {},
    userId: null,

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            Controller.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            Controller.web3Provider = new Web3.providers.HttpProvider(
                'http://localhost:7545');
        } 
        web3 = new Web3(Controller.web3Provider);
        return Controller.initContract();
    },

    initContract: function() {
        $.getJSON('Controller.json', function(data) {
            // Get the necessary contract artifact file
            var ControllerArtifact = data;
            console.log(data);
            // Instantiate it with truffle-contract
            Controller.contracts.Controller = 
                TruffleContract(ControllerArtifact);
            // Set the provider for our contract
            Controller.contracts.Controller.setProvider(
                Controller.web3Provider);
            return Controller.setAUserOnBC();
            //return Controller.getAUserOnBC();
        });
    },

    setAUserOnBC: function() {
        var userId = Controller.userId;
        var cartId = generateAddress();
        var prodCartId = generateAddress();
        console.log(userId, cartId, prodCartId, 0);
        // -------------------------------
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            } else {
                var account = accounts[0];
                console.log("from: ", account);

                Controller.contracts.Controller.deployed().then(
                    function(instance) {
                        console.log(instance);
                        return instance.setAccount(
                            userId, cartId, prodCartId, 0, {gas: 3000000}
                        );
                        alert("good");
                }).then(function(result) {
                    return Controller.getUserOnBC();
                }).catch(function(err) {
                    console.log(err.message);
                });
            }
        });
    },

    getAUserOnBC: function() {
        // alert(address)
        var ControllerInstance;

        Controller.contracts.Controller.deployed().then(function(instance) {
        ControllerInstance = instance;
            return ControllerInstance.getCart(Controller.userId);
        }).then(function(result) {
            console.log("stored on block chain:", result);
        }).catch(function(err) {
            console.log(err.message);
        });
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
    var validDate = 
        (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + value + validDate + path;  
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
  // Add a user to firebase
  var users = firebase.database().ref().child('users');
  var userIdFB = firebase.database().ref().child('users').push().key;
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
    var cid = countries.selectedIndex ;             
    var country = countries.options[cid].text;
    var states = document.getElementById("state");
    var sid = states.selectedIndex;
    var state = states.options[sid].text; 
    var zip = document.getElementById("zip").value.trim();

    // checkValidation here
    var isValid = true;
    //check the email is right or not
    // if (username != "") {
    //     var reg = /^[0-9a-zA-Z_]{5,12}@(163|126|qq|yahoo|gmail|sina)\.(com|com\.cn|cn|la)$/;
    //     isok = username.search(reg);
    //     if (isok < 0) {
    //         isValid = false;
    //         alert("Please enter a valid email address for shipping updates.");
    //         window.location.replace("/signup.html");
    //     }
    // } else {
    //     isValid = false;
    //     alert("Email address cannot be empty, please input again.");
    //     window.location.replace("/signup.html");
    // }

    // //check password and confirmPassword are not empty
    // if(password == "" ||confirmPassword == "") {
    //     isValid = false;
    //     alert("Password or confirmPassword cannot be empty," +
    //         " please input again.");
    //     window.location.replace("/signup.html");   
    // }

    // //check address is valid
    // if (street != "" && suite != "") {      
    //     var regExp = /^[a-z0-9]+$/i;
    //     if (street.search(regExp) < 0 && state.search(regExp) < 0 && 
    //         street.search(/[a-zA-Z]/) < 0 && state.search(/[a-zA-Z]/) < 0) {
    //         isValid = 0;
    //         alert("Please enter a valid address for shipping updates.");
    //         window.location.replace("/signup.html");
    //     }
    // }

    if (isValid) {
        // if all inputs are validate
        if (password != confirmPassword) {
            alert("Password and confirm password are not same, sign up again");
        } else {
            var userIdBC = generateAddress();
            // setOnFirebase(
            //   userIdBC,
            //   username, firstName, lastName, password, 
            //   street, suite, country, state, zip
            // );
            Controller.userId = userIdBC;
            Controller.initWeb3();
        }
    }
}