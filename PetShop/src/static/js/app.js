Controller = {
    web3Provider: null,
    contracts: {},
    userId: null,
    puppyList: null,
    onSales: [],
    petInCart: [],

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            Controller.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            Controller.web3Provider = new Web3.providers.HttpProvider(
                'http://localhost:7545');
        } 
        web3 = new Web3(Controller.web3Provider);
        return Controller.initContract();
    },

    initContract: function() {
        $.getJSON('Controller.json', function(data) {
            // Get the necessary contract artifact file
            var ControllerArtifact = data;
            // console.log(data);
            // Instantiate it with truffle-contract
            Controller.contracts.Controller = 
                TruffleContract(ControllerArtifact);
            // Set the provider for our contract
            Controller.contracts.Controller.setProvider(
                Controller.web3Provider);
            return Controller.getAllPuppiesOnBC();
        });
    },

    getAllPuppiesOnBC: function() {
        Controller.contracts.Controller.deployed().then(function(instance) {;
            return instance.getPuppyList();
        }).then(function(result) {
            Controller.puppyList = result;
            if (result.length > 0) 
                return Controller.isOnSale(0);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    isOnSale: function(i) {
        // console.log(i);
        if (i == Controller.puppyList.length) {
            return Controller.showOnSales();
        }

        var puppyId = Controller.puppyList[i];
        Controller.contracts.Controller.deployed().then(function(instance) {
            return instance.getPuppyStatus(puppyId);
        }).then(function(status) {
            if (status) {
                return Controller.getPuppyInfo(puppyId, i);
            } else {
                return Controller.isOnSale(i + 1);
            }
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    getPuppyInfo: function(puppyId, i) {
        // console.log(puppyId);
        Controller.contracts.Controller.deployed().then(function(instance) {
            return instance.getPuppyInfo(puppyId);
        }).then(function(info) {
            // console.log(info);
            info.push(puppyId);
            Controller.onSales.push(info);
            return Controller.isOnSale(i + 1);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    showOnSales: function() {
<<<<<<< HEAD

        // console.log(Controller.onSales);
        console.log("Stored in Controller.onSales:", Controller.onSales);

=======
>>>>>>> ceb52b1faa8e893df8345287e72b153864fec278
        var data = Controller.onSales;
        var petsRow = $('#petsRow');
        var petTemplate = $('#petTemplate');
        for (i = 0; i < data.length; i ++) {
            petTemplate.find('.panel-title').text(data[i][1]);
            petTemplate.find('.pet-breed').text(data[i][2]);
            petTemplate.find('.pet-age').text(data[i][3]);
            petTemplate.find('.pet-location').text(data[i][4]);
            petTemplate.find('.pet-price').text(data[i][5]);
            petTemplate.find('img').attr('src', data[i][6]);
            petTemplate.find('.btn-add').attr('data-id', i);
            petsRow.append(petTemplate.html());
        }
        return Controller.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-add', Controller.handleAdd);
        $(document).on('click', '.goToShopingCartPage', Controller.goToShopingCartPage);
    },

    handleAdd: function(event) {
        event.preventDefault();
        var index = document.getElementById("shop-cart-index");
        var onSalesIndex = parseInt($(event.target).data('id'));
<<<<<<< HEAD

        console.log("index =", onSalesIndex);
        console.log("onSales:", Controller.onSales);

        // console.log("index =", onSalesIndex);

        if(Controller.petInCart.length == 0){
            Controller.petInCart.push(Controller.onSales[onSalesIndex]);
            Controller.petIdInCart.push(Controller.onSales[onSalesIndex][7]);
            index.innerText++;
        }else{
            for (i = 0; i < Controller.petInCart.length; i ++){

                console.log("petInCart", Controller.petInCart);
                console.log("petIdInCart", Controller.petIdInCart);
                console.log("onSales", Controller.onSales);
                if (Controller.petIdInCart.includes(Controller.onSales[onSalesIndex][7])){
                    console.log("======")

                if (Controller.petInCart.includes(Controller.onSales[onSalesIndex])){
                    // console.log("======");

                    alert("U can't add the same pet!")
                    break;
                }else{
                    // console.log("wtf")
                    Controller.petInCart.push(Controller.onSales[onSalesIndex]);
                    Controller.petIdInCart.push(Controller.onSales[onSalesIndex][7]);
                    index.innerText++;
                    break;
                }
            } 
        } 
        console.log("petIdInCart: ", Controller.petIdInCart);
=======
        Controller.petInCart.push(Controller.onSales[onSalesIndex]);
        $(event.target).attr('disabled', true);
        index.innerText++;
>>>>>>> ceb52b1faa8e893df8345287e72b153864fec278
        console.log("Items in petInCart:", Controller.petInCart);
        setCartCookie(Controller.petInCart, 7);
    },

    goToShopingCartPage: function(event){
        window.location.replace("http://localhost:3000/cart.html");
    }
};


window.onload = function() {  
<<<<<<< HEAD

    // delete_cookie("YY");
    // this is cart cookie part

    var cartValue = getCartCookieValue("YY");
    // console.log("cartValue", cartValue);
    if (cartValue != null){
        var dogscookie = cartValue.split(',');
        var lengthOfCartCookie = dogscookie.length;
        document.getElementById("shop-cart-index").innerText = parseInt(lengthOfCartCookie/8)
        // Controller.petInCart.push(cartValue);
        console.log(dogscookie);
        adoginfo = [];
        for(var i = 0; i < lengthOfCartCookie+1; i++){
            console.log(i);
            if(i == 0){
                adoginfo.push(dogscookie[i])
            }else{
                if(i%8==0){
                    Controller.petInCart.push(adoginfo)
                    Controller.petIdInCart.push(adoginfo[7])
                    console.log("down", Controller.petInCart)
                    adoginfo = []
                    adoginfo.push(dogscookie[i])
                }else{   
                    adoginfo.push(dogscookie[i])
                }
            }
            
        }
    }


    //this is for username

    // var cartValue = getCartCookieValue("YY");
    // console.log(cartValue);
    // if (cartValue != null) {
    //     var lengthOfCartCookie = cartValue.split(',').length;
    // }
    // document.getElementById("shop-cart-index").innerText = parseInt(lengthOfCartCookie/7)
    

=======
>>>>>>> ceb52b1faa8e893df8345287e72b153864fec278
    var value = getCookieValue("userName");  
    var puppyid_list=[];
    console.log(value);
    //deleteCartCookie();
    if(value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login";     
    } else {
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
        Controller.userId = value[0];
    }
    // deleteCartCookie();
    var petInCart = getCartCookie();
    //alert(petInCart.length);
    
    if(petInCart==null){
        alert(petInCart);
    }
    console.log("itemsInCart:", petInCart);
    if(petInCart!=null){
        Controller.petInCart = petInCart;
        //console.log("---------------------------",Controller.petInCart);
        for(var i=0;i<Controller.petInCart.length;i++)
        {
            //console.log(Controller.petInCart[i].split(",")[7]);
            puppyid_list.push(Controller.petInCart[i].split(",")[7]);
            //console.log("puppyy",puppyid_list);
        }
        
        $("#shop-cart-index").html(petInCart.length);
    }
    
    Controller.initWeb3();
}
