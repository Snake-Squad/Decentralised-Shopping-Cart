/* functions while not logged in */
function onClickLogin() {
  window.location.href="login.html";
}

function onClickSignUp() {
  alert("Sign Up");
  window.location.href="signup.html";
}

//shop cart 
function onClickCart() {
  alert("Cart");
  window.location.href="cart.html?"+"txt="+encodeURI(App.petInCart);
}


/* functions after logging in */
function onClickProfile() { 
  window.location.href="personInfo.html";
}

function onClickAddAPuppy(){
  window.location.href="addpuppy.html";
}

function onClickRecharge(){
  window.location.href="recharge.html";
}

function onClickTransactions(){
  window.location.href="transaction.html";
}

function onClickLogOut() {
  delete_cookie("userName"); 
}

function editPersonInfo(){
  window.location.href="editPerson.html";
}

function delete_cookie(name) {
  var exp = new Date();  
  exp.setTime(exp.getTime() - 1);  
  var cval = getCookieValue(name);  
  if (cval != null) {      
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();  
  }
  alert("delete cookie");
  window.location.replace("/");
}

/* search function */
function searchPet(){
  var wat = document.getElementById("searchPetsRow");
  console.log("wat", wat);
  wat.innerHTML = "";
  console.log("wat2", wat);
  
  var input = document.getElementById("searchInput").value.toLowerCase();
  console.log(input);
  var searchP=[];
  //取出pets json中的数据，然后循环item，如果其中的name或者品种中的string包含
  //这个formValue，就存入一个新的list，然后显示这个新的list
  $.getJSON('../pets.json', function(data) {
    var searchP = data.filter(e => e.name.toLowerCase().includes(input) || e.breed.toLowerCase().includes(input)||e.location.toLowerCase().includes(input));
    //将这个serchP里的元素在index页面里显示出来，或者替换之前循环显示的那个list
    var petsRow = document.getElementById("petsRow");
    var searchPetsRow =$("#searchPetsRow");
    var petTemplate = $("#petTemplate");
    petsRow.style.display = "none";
    for (i = 0; i < searchP.length; i ++) {
      petTemplate.find('.panel-title').text(searchP[i].name);
      petTemplate.find('img').attr('src', searchP[i].picture);
      petTemplate.find('.pet-breed').text(searchP[i].breed);
      petTemplate.find('.pet-age').text(searchP[i].age);
      petTemplate.find('.pet-location').text(searchP[i].location);
      // petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
      petTemplate.find('.btn-add').attr('data-id', searchP[i].id);
      searchPetsRow.append(petTemplate.html());
    }
    console.log(searchPetsRow);
  });
}

/* get cookie if it is set */
function getCookieValue(name) {   
    var name = escape(name);  
    var allcookies = document.cookie;         
    name += "=";  
    var pos = allcookies.indexOf(name);      

    if (pos != -1) {
        // get index of some spetial punctuations.
        var start = pos + name.length;
        var comma = allcookies.indexOf(",", start);                 
        var end = allcookies.indexOf(";", start);        
        if (end == -1) end = allcookies.length;    
        // initialize a value to return.
        var value = [];
        value.push(allcookies.substring(start, comma));
        value.push(allcookies.substring(comma + 1, end));
        return (value);                              
    } else  {  
        return [];  
    } 
}

window.onload = function() {  
alert("kkkkk");
alert(window.location.href);
 if(window.location.href.indexOf("personInfo.html")!=-1){
     alert("jjjj");
        var userNameValue = getCookieValue("userName");  
        alert(userNameValue);
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
          var userNameValue = getCookieValue("userName"); 
          alert("lllll");
          //alert(userNameValue);
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
              if (userVal.email == userNameValue) {
             
                  isValid = true;

                  document.getElementById("email").innerHTML=userNameValue;
                  alert(userVal);
                  document.getElementById("first_name").innerHTML=userVal.first_name;
                  document.getElementById("last_name").innerHTML=userVal.last_name;
                  alert(userVal.last_name);
                  document.getElementById("address1").innerHTML=userVal.street;
                  document.getElementById("address2").innerHTML=userVal.suite;
                  document.getElementById("country").innerHTML=userVal.country;
                  document.getElementById("state").innerHTML=userVal.state;
                  document.getElementById("zip").innerHTML=userVal.zip;
                  
                  return true;          // break the loop
                
                
              }
            });
          });
          
      
        }
        
 }
 else{
    var value = getCookieValue("userName");  
    console.log(value);
    if(value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login";     
    } else {
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
    }
 }
}
