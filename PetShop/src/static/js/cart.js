/* -----------------------------------------------------------------------------
 * Set globle values
 * -----------------------------------------------------------------------------
 */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;
var puppies = [];

/*------------------------------------------------------------------------------
 * Find Mailling address
 * ------------------------------------------------------
*/
function findMaillingAddress(){
    //alert("forget password--------------in login.js");
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
    var username = getCookieValue("userName")[0];

    
    var users = firebase.database().ref().child('users');

    
    // This must be the last function of all
    users.on("value", function(snapshot) {
        snapshot.forEach(function(user) {
            var userVal = user.val(); // user's info (email, fn, ln, pw, role)
            // check whether it matches or not
            if (userVal.email == username) {
                
                document.getElementById("address").innerHTML=userVal.suite+" "+userVal.street+" "+userVal.state+","+userVal.country;
                return userVal.suite+" "+userVal.street+" "+userVal.state
                //print("hhd")

            }
        });
  
    });
    
}
/* -----------------------------------------------------------------------------
 * Calculate the total cost.
 * -----------------------------------------------------------------------------
 */
function recalculateCart() {
    var sellerIds =[]; 
    for (var i = 0; i < puppies.length; i++) {
        var sId = puppies[i].split(',')[0];
        sellerIds.push(sId);
    }
    var uniqueSIds = new Set(sellerIds);
    let usIds = Array.from(uniqueSIds);
    Controller.usIds = usIds;
    shippingRate = shippingRate * uniqueSIds.size;

    var subtotal = 0;
    var tax = 0;
    // console.log($('.product').length);
    for(var i=0;i<$('.product').length-1;i++) {
        var sub = parseFloat($($('.product')[i]).children('.product-line-price').text());
        subtotal += sub;
        tax += Math.round(sub * taxRate);
    }
    /* Calculate totals */
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;
    Controller.total = total;
    findMaillingAddress();
    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#num-seller').html(uniqueSIds.size);
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if(total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* -----------------------------------------------------------------------------
 * Remove puppy from cart
 * -----------------------------------------------------------------------------
 */
function removeItem(removeButton, puppies) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    var i = parseInt($(removeButton).attr('data-id'));
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        puppies.splice(i, 1);
        console.log(i, puppies);
        setCartCookie(puppies, 7);
        recalculateCart();
    });
}


/* -----------------------------------------------------------------------------
 * Show all puppies in the cart.
 * -----------------------------------------------------------------------------
 */
function showPuppies(puppies) {
    var cartRow = $('#productRow');
    var cartTemplate = $('#product-none');
    for (i = 0; i < puppies.length; i ++) {
        var info = puppies[i].split(',');
        cartTemplate.find('.product-title').text(info[1]);
        cartTemplate.find('.product-description').text("breed: " + info[2]);
        cartTemplate.find('.product-description1').text("age: " + info[3]);
        cartTemplate.find('.product-description2').text("location: " + info[4]);
        cartTemplate.find(".product-price").text(info[5]);
        cartTemplate.find('img').attr('src', info[6]);
        cartTemplate.find(".product-quantity").find('input').attr("value", 1);
        cartTemplate.find(".product-line-price").text(info[5]);
        cartTemplate.find('.product-removal button').attr('data-id', i);
        cartRow.append(cartTemplate.html());
    };
}


/* -----------------------------------------------------------------------------
 * Load the webpage
 * -----------------------------------------------------------------------------
 */
window.onload = function() {
    var value = getCookieValue("userName");
    if(value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login";     
    } else {
        document.getElementById("loginnavbarDropdown").text = value[0];
        Controller.userId = value[1];
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
    }

    puppies = getCartCookie();
    showPuppies(puppies);
    recalculateCart();
    $('.product-removal button').click( function() {
        removeItem(this, puppies);
    });

}
