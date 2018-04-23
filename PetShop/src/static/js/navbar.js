function onClickLogin() {
  alert("In navbar.js");

  document.getElementById('idLogin').style.display='block';

  // Get the modal
  var modal = document.getElementById('idLogin');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}



function onClickSignUp() {
  alert("Sing Up");

  document.getElementById('idSignUp').style.display='block';

  // Get the modal
  var modal = document.getElementById('idSignUp');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//shop cart 
function onClickCart() {
  alert("Cart");
  window.location.href="cart.html?"+"txt="+encodeURI(App.petInCart);
}