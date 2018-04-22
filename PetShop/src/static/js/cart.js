/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00; 
var fadeTime = 300;

/* get value from previous page */
var loc = location.href;
var n1 = loc.length;//地址的总长度
var n2 = loc.indexOf("=");//取得=号的位置
var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容

/* value processing */
var petIdList =id.split(",");
var petsInfo = [];
var count =[];
for(var i=0;i<petIdList.length;i++){
  var e =petIdList[i];
  if(petsInfo.indexOf(e) >= 0){
    count[petsInfo.indexOf(e)]++;
  }else{
    petsInfo.push(e);
    count.push(1);
  }
};

$.getJSON('../pets.json', function(data) {
  var cartRow = $('#productRow');
  var cartTemplate = $('#product-none');
  for (i = 0; i < petsInfo.length; i ++) {
    cartTemplate.find('.product-title').text(data[petsInfo[i]].name);
    cartTemplate.find('img').attr('src', data[petsInfo[i]].picture);
    cartTemplate.find('.product-description').text(data[petsInfo[i]].breed+"  "+data[petsInfo[i]].age);
    cartTemplate.find(".product-quantity").find('input').attr("value",count[i]);
    cartTemplate.find(".product-price").text("20");
    cartTemplate.find(".product-line-price").text(count[i]* document.getElementById("product-price").innerText);
    cartRow.append(cartTemplate.html());
  };
  $('#quantity').change( function() {
    updateQuantity(this);
  });
  $('.product-removal button').click( function() {
    removeItem(this);
  });
   recalculateCart()
});



/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  console.log($('.product'));
for(var i=0;i<$('.product').length-1;i++){
   subtotal += parseFloat($($('.product')[i]).children('.product-line-price').text());
}
  /* Sum up row totals */
  // $('.product').each(function () {
  //   subtotal += parseFloat($(this).children('.product-line-price').text());
  // });
  
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
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}

/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}

/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}
