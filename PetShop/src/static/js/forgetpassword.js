function answerQuestions() {

    var users = firebase.database().ref().child('users');
  
    var value = getCookieValue("userName")[0];
    var question1_answer = document.getElementById("question1_answer").value.trim();
    var question2_answer = document.getElementById("question2_answer").value.trim();
    var question3_answer = document.getElementById("question3_answer").value.trim();
    // checkValidation here
    var checkValid = 1;

    // This must be the last function of al
    users.on("value", function(snapshot) {
        //var isValid = false;
        var userId = "";            // this id is used in blockchain

        snapshot.forEach(function(user) {
            // retrieve data from db
            var userKey = user.key;   // user id
            var userVal = user.val(); // user's info (email, fn, ln, pw, role)
      
            if (userVal.email == value) {
         
                if((userVal.question1_answer == question1_answer)&&(userVal.question2_answer == question2_answer)&&(userVal.question3_answer == question3_answer))
                {
                    //addCookie("userName", username, userId, 7, "/");
                    
                    alert("you can reset");
                    document.getElementById("questionsForm").style.display = 'none';
                    document.getElementById("resetPassword").style.display = 'block';
                    //window.location.replace("resetPassword.html");
                }
            return true; // break the loop
            }
   
        });

    });
}
    
    
function resetPassword(){
  
    var value = getCookieValue("userName")[0];
    var password = document.getElementById("psw").value.trim();
    var confirm_password = document.getElementById("psw-repeat").value.trim();
    // checkValidation here
    var checkValid = 1;
    alert("fighting");
    var users = firebase.database().ref().child('users');
    console.log(getCookieValue("userName"));
    // This must be the last function of all
    if(password==null || confirm_password==null || password!=confirm_password)
    {
        alert("password should be consistent");
        checkValid=0;
        //window.location.replace("login.html");
    }
    if(checkValid==1){
        users.on("value", function(snapshot) {

            snapshot.forEach(function(user) {
                // retrieve data from db
                var userKey = user.key;   // user id
                var userVal = user.val(); // user's info (email, fn, ln, pw, role)
                
                if (userVal.email == value) {
   
                    alert("you successful reset");
                    firebase.database().ref().child('users/' + userKey).update({                 
                        "password": password,
                    });
                    window.location.replace("/");
                    return true;
                        //window.location.replace("resetPassword.html");
                    }
     
            });

        });
    }
}
  