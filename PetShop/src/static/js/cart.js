/* -----------------------------------------------------------------------------
 * Set globle values
 * -----------------------------------------------------------------------------
 */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;


/* -----------------------------------------------------------------------------
 * Calculate the total cost.
 * -----------------------------------------------------------------------------
 */
function recalculateCart() {
    var subtotal = 0;
    // console.log($('.product').length);
    for(var i=0;i<$('.product').length-1;i++){
        subtotal += parseFloat($($('.product')[i]).children(
            '.product-line-price').text());
    }
    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;
  
    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
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
    console.log(value);
    if(value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login";     
    } else {
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
    }

    var puppies = getCartCookie();
    console.log(puppies);
    showPuppies(puppies);
    recalculateCart();
    $('.product-removal button').click( function() {
        removeItem(this, puppies);
    });

}
