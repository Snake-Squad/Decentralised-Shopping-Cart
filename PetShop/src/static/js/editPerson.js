
function editPerson() {
    alert(" onClickeditperson ");
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
    // get the database
    var users = firebase.database().ref().child('users');
    
    var value = getCookieValue("userName");
  
    
    // checkValidation here
    var checkValid = 1;
   

    //check password and confirmPassword are not empty
    if(password == "" ||confirmPassword == "") {
        checkValid =0;
        alert("Password or confirmPassword cannot be empty," +
            " please input again.");
        window.location.replace("/signup.html");   
    }

    //check address is valid
    if (street != "" && suite != "") {      
        var regExp = /^[a-z0-9]+$/i;
        if (street.search(regExp) < 0 && state.search(regExp) < 0 && 
            street.search(/[a-zA-Z]/) < 0 && state.search(/[a-zA-Z]/) < 0) {
            checkValid = 0;
            alert("Please enter a valid address for shipping updates.");
            window.location.replace("/signup.html");
        }
    }
    if(checkValid==1){
        // This must be the last function of all
      
        users.on("value", function(snapshot) {
            //var isValid = false;
            var userId = "";            // this id is used in blockchain

            snapshot.forEach(function(user) {
                // retrieve data from db
                var userKey = user.key;   // user id
                var userVal = user.val(); // user's info (email, fn, ln, pw, role)
                //alert(userKey);
                // check whether it matches or not
                //alert(userVal.email);
               
                //if (userVal.email == value) {
               if(userVal.email=="test@gmail.com") { 
                
                if(password == confirmPassword) { 
              
                firebase.database().ref().child('users/' + userKey).update({
                   
                    "password": password,
                    "first_name": firstName,
                    "last_name":lastName,
                    "street": street, 
                    "suite": suite, 
                    "country": country, 
                    "state": state,
                    "zip": zip
        
                 
                });
                //isValid = true;
               
                return true; // break the loop
                }
               
                }
            });
            // alert(isValid);
            window.location.replace("/");
            /*if (isValid) {
                window.location.replace("/");
            } else {
                alert("Email or password is not correct, please input again");
                window.location.href="editPerson.html";
            }*/
        });
    }
    else{
        window.location.replace("editPerson.html");
    }
    
}