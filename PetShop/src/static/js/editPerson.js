
function editPerson() {

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
    // get the database
    var users = firebase.database().ref().child('users');
    
    var value = getCookieValue("userName")[0];
  
    
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
    
    if(question1_answer=="" || question2_answer==""|| question3_answer==""){
        checkValid = 0;
        alert("Security question's answers cannot be empty.");
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
               
                if (userVal.email == value) {
               //if(userVal.email=="test@gmail.com") { 
                
                if(password == confirmPassword) { 
              
                firebase.database().ref().child('users/' + userKey).update({
                   
                    "password": md5(password),
                    "first_name": firstName,
                    "last_name":lastName,
                    "street": street, 
                    "suite": suite, 
                    "country": country, 
                    "state": state,
                    "zip": zip,
                    "question1": question1,
                    "question1_answer": question1_answer,
                    "question2": question2,
                    "question2_answer": question2_answer,
                    "question3": question3,
                    "question3_answer": question3_answer,
        
                 
                });
                //isValid = true;
               
                return true; // break the loop
                }
               
                }
            });
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



//window.onload to change the navabar
window.onload = function(){  
    var userNameValue = getCookieValue("userName")[0];  
    
    if(userNameValue === undefined || userNameValue == null || userNameValue.length <= 0){
        document.getElementById("login_navabar").text = "Login"; 
        
        }
    else{
      document.getElementById("loginnavbarDropdown").text = userNameValue;  
      document.getElementById("loginnavbarDropdown").style.display = 'block';
      document.getElementById("login_navabar").style.display = 'none';
      document.getElementById("signup_navabar").style.display = 'none';
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
          if (userVal.email == userNameValue) {
         
              isValid = true;    
              document.getElementById("email").innerHTML=userNameValue;
              document.getElementById("first_name").value=userVal.first_name; 
              document.getElementById("last_name").value=userVal.last_name;
              document.getElementById("psw").value=userVal.psw; 
              document.getElementById("psw-repeat").value=userVal.psw;
              document.getElementById("address1").value=userVal.street;
              document.getElementById("address2").value=userVal.suite;
              
              document.getElementById("country-option1").checked;
              var state_options=document.getElementById("state");
              
              for(var i = 0; i < state_options.length; i++) {  
                if (userVal.state == state_options[i].value) 
                    {  

                        state_options[i].selected=true;
                    }  
                } 
                
              var question1_options=document.getElementById("question1");

              for(var i = 0; i < question1_options.length; i++) {  
                if (userVal.question1 == question1_options[i].value) 
                    {  
                        question1_options[i].selected=true;
                    }  
                } 
              document.getElementById("question1_answer").value=userVal.question1_answer;
              var question2_options=document.getElementById("question2");
            
              for(var i = 0; i < question2_options.length; i++) {  
                if (userVal.question2 == question2_options[i].value) 
                    {  
                        question2_options[i].selected=true;
                    }  
                }
              document.getElementById("question2_answer").value=userVal.question2_answer;
              var question3_options=document.getElementById("question3");
            
              for(var i = 0; i < question3_options.length; i++) {  
                if (userVal.question3 == question3_options[i].value) 
                    {  
                        question3_options[i].selected=true;
                    }  
                }
              document.getElementById("question3_answer").value=userVal.question3_answer;
              document.getElementById("zip").value=userVal.zip;
              
              return true;          // break the loop
          }
        });
      });
    }
   
    
}   
