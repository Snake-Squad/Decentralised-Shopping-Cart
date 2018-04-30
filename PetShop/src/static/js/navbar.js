/* -----------------------------------------------------------------------------
 * functions while not logged in 
 * -----------------------------------------------------------------------------
 */
function onClickLogin() {
    window.location.href="login.html";
}

function onClickSignUp() {
    alert("Sign Up");
    window.location.href="signup.html";
}

function onClickCart() {
    alert("Cart");
    window.location.href="http://localhost:3000/cart.html";
}


/* -----------------------------------------------------------------------------
 * functions after logging in 
 * -----------------------------------------------------------------------------
 */
$("#navProfile").click(function() {
    window.location.href = "http://localhost:3000/personInfo.html";
});

$("#navAddAPuppy").click(function() {
    window.location.href="http://localhost:3000/addpuppy.html";
});

$("#navRecharge").click(function() {
    window.location.href = "http://localhost:3000/recharge.html";
});

$("#navTransactions").click(function() {
    window.location.href = "http://localhost:3000/transaction.html";
});

$("#navLogout").click(function() {
    delete_cookie("userName"); 
});

function editPersonInfo() {
    window.location.href="/editPerson.html";
}



/* -----------------------------------------------------------------------------
 * search function 
 * This function is really bad now.
 * -----------------------------------------------------------------------------
 */
function searchPet() {
    alert("onClick Search");
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
    var searchP = data.filter(e => e.name.toLowerCase().includes(input) ||
        e.breed.toLowerCase().includes(input)||
        e.location.toLowerCase().includes(input)
    );
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

