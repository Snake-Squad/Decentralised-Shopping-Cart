function submitBtnClick() {
	var email = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;
	document.getElementById("formid").submit();
  alert(email);
  alert(password);
}