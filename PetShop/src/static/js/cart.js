/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;

/* get value from previous page */
var loc = location.href;
var n1 = loc.length;//地址的总长度
var n2 = loc.indexOf("=");//取得=号的位置
var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容


// addCartCookie("YY", id, 7);


/* value processing */
var petIdList =id.split(",");
var petsInfo = [];
var count =[];
var apetInfo = [];
/*get infomation of all pets*/
for(var i=0;i<petIdList.length+1;i++){
  if(i%8 !== 0){
    apetInfo.push(petIdList[i])
    // console.log(apetInfo)
  }else{
    if(i != 0){
      petsInfo.push(apetInfo)
      apetInfo=[]
    }  
  }
};
console.log(petsInfo)


/* -----------------------------------------------------------------------------
 * Calculate the total cost.
 * -----------------------------------------------------------------------------
 */
function recalculateCart() {
    console.log("=================")
    var subtotal = 0;
    // console.log($('.product').length);
    for(var i=0;i<$('.product').length-1;i++){
        subtotal += parseFloat($($('.product')[i]).children('.product-line-price').text());
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
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}

$('.product-removal button').click( function() {
    removeItem(this);
});



function showPuppies(puppies) {
    var cartRow = $('#productRow');
    var cartTemplate = $('#product-none');
    for (i = 0; i < puppies.length; i ++) {
        var info = puppies[i].split(',');
        console.log('puppy info', info);

        cartTemplate.find('.product-title').text(info[1]);
        cartTemplate.find('.product-description').text("breed: " + info[2]);
        cartTemplate.find('.product-description1').text("age: " + info[3]);
        cartTemplate.find('.product-description2').text("location: " + info[4]);
        cartTemplate.find(".product-price").text(info[5]);
        cartTemplate.find('img').attr('src', info[6]);
        cartTemplate.find(".product-quantity").find('input').attr("value", 1);
        
        cartTemplate.find(".product-line-price").text(info[5]);
        cartRow.append(cartTemplate.html());
    };
}


/* -----------------------------------------------------------------------------
 * Load the webpage
 * -----------------------------------------------------------------------------
 */
window.onload = function() {
    var puppies = getCartCookie();
    console.log(puppies);
    showPuppies(puppies);
    recalculateCart();
}
