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
function onClickPorfile() { 
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

function delete_cookie(name) {
  var exp = new Date();  
  exp.setTime(exp.getTime() - 1);  
  var cval=getCookieValue(name);  
  if(cval!=null){      
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
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
    var start = pos + name.length;                 
    var end = allcookies.indexOf(";",start);        
    if (end == -1) end = allcookies.length;        
    var value = allcookies.substring(start,end);  
    return (value);                              
  } else{  
    return "";  
  } 
}

