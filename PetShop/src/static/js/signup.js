function checkSignUp() {
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
  //alert("hhd");
  
  // get information from the webpage
  var username_ = document.getElementById("email").value.trim();
  var password_ = document.getElementById("psw").value.trim();
  var confirm_password = document.getElementById("psw-repeat").value.trim();
  var firstname_ = document.getElementById("first_name").value.trim();
  var lastname_ = document.getElementById("last_name").value.trim();
  var maillingaddress_= document.getElementById("mailling_address").value.trim();
  //var remember = document.getElementById("remember").value.trim();
  //get the role of user
  var buyer = document.getElementById("buyer").value;
  var seller = document.getElementById("seller").value;
  //alert(buyer);
  if(password_!=confirm_password)
  {
      alert("Password and confirm password are not same, sign up again");
      window.location.href="signup.html";
      
  }
  else{
    alert("Success sign up");
  }
 
  alert("kkkkk");
  if(buyer == "on")
  {
      var users = firebase.database().ref().child('users').push({email:username_,password:password_,first_name:firstname_,last_name:lastname_,mailling_address:maillingaddress_,role:"buyer"});
      // Get a key for a new Post.
      // Write the new post's data simultaneously in the posts list and the user's post list.
    
      alert("users");
  }
  else{
      
    var users = firebase.database().ref().child('users').push({email:username_,password:password_,first_name:firstname,last_name:lastname,mailling_address:maillingaddress,role:"seller"});
  }
  
  //alert(users);
 

}
