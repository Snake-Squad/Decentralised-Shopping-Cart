Controller = {
    web3Provider: null,
    contracts: {},
    username: null,
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
        });
    },

    setAUserOnBC: function() {
        console.log("setAUserOnBC")
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
                        return instance.setAccount(userId, cartId, prodCartId, 0, {gas: 3000000});
                }).then(function(result) {
                    return Controller.getAUserOnBC();
                }).catch(function(err) {
                    console.log(err.message);
                });
            }
        });
    },

    getAUserOnBC: function() {
        addCookie("userName", Controller.username, Controller.userId, 7, "/"); 
        console.log("Added On Block Chain.");               
        window.location.href = "http://localhost:3000/";
    }
};


function setOnFirebase(
    userIdBC,
    username, firstName, lastName, password, 
    street, suite, country, state, zip,question1,question1_answer,question2,question2_answer,question3,question3_answer,
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
    var sig=0;
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
                //alert(userVal.password);
                isValid = true;
                if(sig==0){
                    alert("User already exist, Please login!");
                    window.location.href="login.html";
                }
                return true; // break the loop
                }
            
        });
        
        if (isValid==false) {
       
            sig=1;

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
            "user_id": userIdBC,
            "question1": question1,
            "question1_answer": question1_answer,
            "question2": question2,
            "question2_answer": question2_answer,
            "question3": question3,
            "question3_answer": question3_answer,
        }).then(function(result) {
            console.log("Added on firebase.");
            Controller.username = username;
            Controller.userId = userIdBC;
            console.log(Controller.userId, Controller.username);
            return Controller.initWeb3();
        });
                       
            }
        });
    
}


$("#btnSignUp").click(function() {
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
    
    var questionFirsts = document.getElementById("question1");
    var quest1 = questionFirsts.selectedIndex ;             
    var question1= questionFirsts.options[quest1].text;
    var question1_answer = document.getElementById("question1_answer").value.trim();
    
    var questionSeconds = document.getElementById("question2");
    var quest2 = questionSeconds.selectedIndex ;             
    var question2= questionSeconds.options[quest2].text;
    var question2_answer = document.getElementById("question2_answer").value.trim();
    
    var questionThirds = document.getElementById("question3");
    var quest3 = questionThirds.selectedIndex ;             
    var question3 = questionThirds.options[quest3].text;
    var question3_answer = document.getElementById("question3_answer").value.trim();
    
    // checkValidation here
    var isValid = 1;
    //check the email is right or not
    if (username != "") {
        var reg = /^[0-9a-zA-Z_]{1,24}@(163|126|qq|yahoo|gmail|sina|hotmail)\.(com|com\.cn|cn|la)$/;
        isok = username.search(reg);
        if (isok < 0) {
            isValid = 0;
            alert("Please enter a valid email address for shipping updates." + 
                "\n" +
                "[0-9a-zA-Z_]{1,24}@(163/126/qq/yahoo/gmail/sina/hotmail).(com/com.cn/cn/la");
            //window.location.replace("/signup.html");
        }
    } else {
        isValid = 0;
        alert("Email address cannot be empty, please input again.");
        //window.location.replace("/signup.html");
    }

    //check password and confirmPassword are not empty
    if(password == "" ) {
        isValid = 0;
        alert("Password cannot be empty," +
            " please input again.");
        //window.location.replace("/signup.html");   
    }
    if(password !=confirmPassword) {
        isValid = 0;
        alert("ConfirmPassword cannot be the same with Password, "+
        "Please input ConfirmPassword again.");
        //window.location.replace("/signup.html");
    }
    

    //check address is valid
    if (street != "" && suite != "") {      
        var regExp = /^[a-z0-9]+$/i;
        if (street.search(regExp) < 0 && state.search(regExp) < 0 && 
            street.search(/[a-zA-Z]/) < 0 && state.search(/[a-zA-Z]/) < 0) {
            isValid = 0;
            alert("Please enter a valid address for shipping updates.");
            //window.location.replace("/signup.html");
        }
    }
    else{
        isValid = 0;
        alert("Address cannot be empty.");
    }
    
    if(question1_answer=="" || question2_answer==""|| question3_answer==""){
        isValid = 0;
        alert("Security question's answers cannot be empty.");
    }

    if (isValid) {
      
        // if all inputs are validate
        if (password != confirmPassword) {
            alert("Password and confirm password are not same, sign up again");
        } else {
            var userIdBC = generateAddress();
            setOnFirebase(
              userIdBC,
              username, firstName, lastName, md5(password), 
              street, suite, country, state, zip,question1,question1_answer,question2,question2_answer,question3,question3_answer,
            );
        }
    }
});