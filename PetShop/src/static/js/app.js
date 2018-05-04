Controller = {
    web3Provider: null,
    contracts: {},
    userId: null,
    puppyList: null,
    onSales: [],
    petsInCartIds: [],
    petInCart: [],
    cartLoaded: false,

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
        // console.log("web3 initialized");
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
            // console.log("Contract initialized");
            return Controller.getAllPuppiesOnBC();
        });
    },

    // -------------------------------------------------------------------------
    getAllPuppiesOnBC: function() {
        Controller.contracts.Controller.deployed().then(function(instance) {;
            return instance.getPuppyList();
        }).then(function(result) {
            Controller.puppyList = result;
            // console.log("p on bc ->", result);
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
        var data = Controller.onSales;
        // console.log(data);
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
        return Controller.handleAdded();
    },

    handleAdded: function() {
        // console.log(Controller.petInCart);
        for (var i = Controller.petInCart.length - 1; i >= 0; i--) {
            var data = Controller.petInCart[i].split(",");
            var id = parseInt(data[8]);
            console.log(id);
            $('.panel-pet').eq(id).find('button')
                .text('Added').attr('disabled', true);
        }
        return Controller.bindEvents();
    },

    // -------------------------------------------------------------------------
    bindEvents: function() {
        $(document).on('click', '.btn-add', Controller.handleAdd);
        $(document).on('click', '.goToShopingCartPage', Controller.goToShopingCartPage);
    },

    handleAdd: function(event) {
        console.log("add to cart");
        event.preventDefault();
        var index = document.getElementById("shop-cart-index");
        var onSalesIndex = parseInt($(event.target).data('id'));
        var data = Controller.onSales[onSalesIndex];
        data += "," + onSalesIndex;
        console.log('data',data);
        Controller.petInCart.push(data);
        $(event.target).text('Added').attr('disabled', true);
        index.innerText++;
        console.log("Items in petInCart:", Controller.petInCart);
        setCartCookie(Controller.petInCart, 7);
    },

    goToShopingCartPage: function(event){
        window.location.replace("http://localhost:3000/cart.html");
    }    
};


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
        Controller.userId = value[0];
    }
    var petInCart = getCartCookie();
    console.log(petInCart);
    Controller.petInCart = petInCart;
    $("#shop-cart-index").html(petInCart.length);
    Controller.initWeb3();
}
