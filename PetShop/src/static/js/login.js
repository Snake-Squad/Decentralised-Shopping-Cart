

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
function getCookieValue(name){   

    var name = escape(name);  
 
    var allcookies = document.cookie;         
  
    name += "=";  
    var pos = allcookies.indexOf(name);      

    if (pos != -1){                                             
        var start = pos + name.length;                 
        var end = allcookies.indexOf(";",start);        
        if (end == -1) end = allcookies.length;        
        var value = allcookies.substring(start,end);  
        return (value);                              
    }else{  
        return "";  
    } 
}
function onClicklogout(){
    delete_cookie("userName"); 
    
}
function delete_cookie(name) {
  /*
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
  */
  var exp = new Date();  
  exp.setTime(exp.getTime() - 1);  
  var cval=getCookieValue(name);  
  if(cval!=null){      
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
  }

  alert("delete cookie");
  window.location.replace("/");

}
function checkLogin() {
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
  alert("HH");
  //
  // This must be the last function of all
  users.on("value", function(snapshot) {
    var isValid = false;

    snapshot.forEach(function(user) {
      // retrieve data from db
      var userKey = user.key; // user id
      var userVal = user.val(); // user's info (email, fn, ln, pw, role)
      
      //alert(userVal.email);
      // check whether it matches or not
      if (userVal.email == username) {
        if (userVal.password == password) {
          isValid = true;
          
          return true;
        }
      }
    });
    //alert(isValid);
    if (isValid) {
        
      addCookie("userName",username,7,"/"); 
      
      //$("#login_navabar").text(username);
      window.location.replace("/");
      
    } else {
      alert("Email or password is not correct, please input again");
      window.location.href="login.html";
    }
  });

}
