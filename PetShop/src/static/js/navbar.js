function onClickLogin() {
  alert("In navbar.js");
  
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