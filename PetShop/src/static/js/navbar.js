/* -----------------------------------------------------------------------------
 * functions while not logged in 
 * -----------------------------------------------------------------------------
 */
function onClickLogin() {
    window.location.href="login.html";
}

function onClickSignUp() {
    window.location.href="signup.html";
}

function onClickCart() {
    window.location.href="http://localhost:3000/cart.html";
}


/* -----------------------------------------------------------------------------
 * functions after logging in 
 * -----------------------------------------------------------------------------
 */
$("#navProfile").click(function() {
    window.location.href = "http://localhost:3000/editPerson.html";
});

$("#navAddAPuppy").click(function() {
    window.location.href="http://localhost:3000/add_a_puppy.html";
});

$("#navEditPostedPuppies").click(function() {
    window.location.href="http://localhost:3000/edit_posted_puppies.html";
});

$("#navRecharge").click(function() {
    window.location.href = "http://localhost:3000/recharge.html";
});

$("#navTransactions").click(function() {
    window.location.href = "http://localhost:3000/transaction.html";
});

$("#navLogout").click(function() {
    logout();
});


/* -----------------------------------------------------------------------------
 * search function 
 * -----------------------------------------------------------------------------
 */
function searchPet() {
    /*store search tpye and input value into localStorage */
    var e = document.getElementById("searchType");
    var value = e.options[e.selectedIndex].value;
    var searchKey = document.getElementById("searchInput").value.toLowerCase();
    var searchItems = [];
    searchItems.push(searchKey);
    searchItems.push(value);
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("searchItems", searchItems);
        window.location.replace("http://localhost:3000/");
    }
  }


/* -----------------------------------------------------------------------------
 * Deal with cookies. Add, get and delete
 * -----------------------------------------------------------------------------
 */
function addCookie(name, username, uid, days, path) {
    var name = escape(name);  
    var username = escape(username);  
    var uid = escape(uid);
    var expires = new Date();  
    expires.setTime(expires.getTime() + days * 3600000 * 24);  
    //path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
    path = path == "" ? "" : ";path=" + path;  
    //GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
    //参数days只能是数字型  
    var _expires = 
        (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();  
    document.cookie = name + "=" + [username, uid] + _expires + path;  
    console.log(document.cookie);
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

function delete_cookie(name) {
    var exp = new Date();  
     exp.setTime(exp.getTime() - 1);  
     var cval = getCookieValue(name);  
    if (cval != null) {      
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();  
    }
    window.location.replace("/");
}


/* -----------------------------------------------------------------------------
 * Thees setter and getter are used for editing a dog.
 * -----------------------------------------------------------------------------
 */
function setEditCookie(data, exdays) {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + expiresDate.toUTCString();
    document.cookie = "editTargets=" + data + ";" + expires + ";path=/";
    console.log(document.cookie);
}

function getEditCookie() {
    var name = escape("editTargets") + "=";  
    var cookie = document.cookie;
    var pos = cookie.indexOf(name);
    if (pos == -1) return null;
    var start = pos + name.length;
    var end = end = cookie.length;
    var data = cookie.substring(start, end);
    var list = data.split(",");
    return list;
}

function deleteEditCookie() {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() - 1);
    var expires = "expires=" + expiresDate.toGMTString();
    document.cookie = 'editTargets=;' + expires;
    console.log(document.cookie);
}


/* -----------------------------------------------------------------------------
 * Thees setter and getter are used for adding a dog to shopping chart.
 * -----------------------------------------------------------------------------
 */
function setCartCookie(data, exdays) {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + expiresDate.toUTCString();
    var value = "";
    for (var i = 0; i < data.length; i++) {
        value += data[i] + "|||";
    }
    document.cookie = "puppiesInCart=" + value + ";" + expires + ";path=/";
}

function getCartCookie() {
    var name = escape("puppiesInCart") + "=";  
    var cookie = document.cookie;
    var pos = cookie.indexOf(name);
    if (pos == -1) return [];
    var start = pos + name.length;
    var end = end = cookie.length;
    var data = cookie.substring(start, end);
    var puppies = data.split("|||");
    puppies.pop();
    return puppies;
}

function deleteCartCookie() {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() - 1);
    var expires = "puppiesInCart=" + expiresDate.toGMTString();
    document.cookie = 'puppiesInCart=;' + expires;
}
