function addCookie(name,value,days,path){   /**添加设置cookie**/  
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
  
  alert("getting data from UI now")
  // get information from the webpage
  var username_ = document.getElementById("email").value.trim();
  var password_ = document.getElementById("psw").value.trim();
  var confirm_password = document.getElementById("psw-repeat").value.trim();
  var firstname_ = document.getElementById("first_name").value.trim();
  var lastname_ = document.getElementById("last_name").value.trim();
  // var maillingaddress_= document.getElementById("mailling_address").value.trim();
  var mainaddress = document.getElementById("address1").value.trim();
  var additionaddress = document.getElementById("address2").value.trim();
  var select_country=document.getElementById("country");
  var country_index=select_country.selectedIndex ;             // country_Index is the index user choose
  var select_state=document.getElementById("state");
  var state_index=select_state.selectedIndex ; 
  var zip = document.getElementById("zip").value.trim();

  /*
  var remember = document.getElementById("remember").value.trim();
  get the role of user
  var buyer = document.getElementById("buyer").value;
  var seller = document.getElementById("seller").value;
  */
  //alert(buyer);
  if(password_!=confirm_password)
  {
      alert("Password and confirm password are not same, sign up again");
      window.location.href="signup.html";
      
  }
  else{
    alert("Success sign up");
    //redirect to home page with the username
    var users = firebase.database().ref().child('users').push({"email":username_,"password":password_,"first_name":firstname_,"last_name":lastname_,"mailling_address":maillingaddress_,"mainaddress":mainaddress,"additionaddress":additionaddress,"country":select_country.options[country_index].text,"state":select_state.options[state_index].text,"zip":zip});
    addCookie("userName",username_,7,"/"); 
    window.location.replace("/");
    //window.location.href="http://localhost:3000?username=yy";
  
  }

 
  
  /*
  if(buyer == "on")
  {
      var users = firebase.database().ref().child('users').push({email:username_,password:password_,first_name:firstname_,last_name:lastname_,mailling_address:maillingaddress_,role:"buyer"});
      // Get a key for a new Post.
      // Write the new post's data simultaneously in the posts list and the user's post lis
    
      alert("users");
  }
  else{
      
    var users = firebase.database().ref().child('users').push({email:username_,password:password_,first_name:firstname,last_name:lastname,mailling_address:maillingaddress,role:"seller"});
  }
  */
 


}
