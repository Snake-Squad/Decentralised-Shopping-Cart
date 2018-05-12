Login = {
    web3Provider: null,
    contracts: {},
    username: null,
    userId: null,
    petsInCartIds: [],
    petInCart: [],
    mailing: "",

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            Login.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            Login.web3Provider = new Web3.providers.HttpProvider(
                'http://localhost:7545');
        } 
        web3 = new Web3(Login.web3Provider);
        // console.log("web3 initialized");
        return Login.initContract();
    },

    initContract: function() {
        $.getJSON('Controller.json', function(data) {
            // Get the necessary contract artifact file
            var LoginArtifact = data;
            // console.log(data);
            // Instantiate it with truffle-contract
            Login.contracts.Controller = 
                TruffleContract(LoginArtifact);
            // Set the provider for our contract
            Login.contracts.Controller.setProvider(
                Login.web3Provider);
            // console.log("Contract initialized");
            return Login.getPetsIdInCart();
        });
    },

    // -------------------------------------------------------------------------
    getPetsIdInCart: function() {
        Login.contracts.Controller.deployed().then(function(instance) {;
            return instance.getAccount(Login.userId);
        }).then(function(result) {
            Login.petsInCartIds = result[0];
            localStorage.setItem("curBalance", parseInt(result[2]));
            var limit = Login.petsInCartIds.length;
            return Login.getPuppyDetail(0, limit);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    getPuppyDetail: function(i, limit) {
        if (i == limit)    
            return Login.initCookies();
        var pid = Login.petsInCartIds[i];
        Login.contracts.Controller.deployed().then(function(instance) {;
            return instance.getPuppyInfo(pid);
        }).then(function(result) {
            result.push(Login.petsInCartIds[i]);
            Login.petInCart.push(result);
            return Login.getPuppyDetail(i + 1, limit);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    initCookies: function () {
        console.log(Login.petInCart);
        addCookie("userName", Login.username, Login.userId, 7, "/");
        setCartCookie(Login.petInCart, 7);
        window.location.replace("/");
    }
};


function onClickCheckLogin() {
    // alert(" onClickCheckLogin ")
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
    var password = md5(document.getElementById("password").value);

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
        
        if (isValid) {
            Login.username = username;
            Login.userId = userId;
            Login.initWeb3();
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
    var checkUser =1 ;
    if(username == ""){
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
                    window.location.replace("forget_password.html");

                }
            });
            //alert(isValid);
            if (!isValid) {
                alert("No such user in the DB, please check your username");
                window.location.href = "login.html";
            }
        });
    }
}

