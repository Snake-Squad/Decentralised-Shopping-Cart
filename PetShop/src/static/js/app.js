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
            Controller.onSales.push(info);
            return Controller.isOnSale(i + 1);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    showOnSales: function() {
        var data = Controller.onSales;
        var petsRow = $('#petsRow');
        var petTemplate = $('#petTemplate');

        for (i = 0; i < data.length; i ++) {
            //petTemplate.find('.pet-seller').text(data[i][0]);
            petTemplate.find('.panel-title').text(data[i][1]);
            petTemplate.find('.pet-breed').text(data[i][2]);
            petTemplate.find('.pet-age').text(data[i][3]);
            petTemplate.find('.pet-location').text(data[i][4]);
            petTemplate.find('.pet-price').text(data[i][5]);
            petTemplate.find('img').attr('src', data[i][6]);

            petTemplate.find('.btn-add').attr('data-id', i);
            petsRow.append(petTemplate.html());
        }
        // console.log(data);

        return Controller.bindEvents();
    },

    bindEvents: function() {
    // $(document).on('click', '.btn-adopt', App.handleAdopt);
        $(document).on('click', '.btn-add', Controller.handleAdd);
        $(document).on('click', '.goToShopingCartPage', Controller.goToShopingCartPage);
    },

    handleAdd: function(event) {
        event.preventDefault();
        var index = document.getElementById("shop-cart-index");
        

        var onSalesIndex = parseInt($(event.target).data('id'));
        console.log("index =", onSalesIndex);
        if(Controller.petInCart.length == 0){
            Controller.petInCart.push(Controller.onSales[onSalesIndex]);
            index.innerText++;
        }else{
            for (i = 0; i < Controller.petInCart.length; i ++){
                if (Controller.petInCart.includes(Controller.onSales[onSalesIndex])){
                    console.log("======")
                    alert("U can't add the same pet!")
                    break;
                }else{
                    console.log("wtf")
                    Controller.petInCart.push(Controller.onSales[onSalesIndex]);
                    index.innerText++;
                    break;
                }
            } 
        } 
        
        console.log("Items in petInCart:", Controller.petInCart);
        
        
        
    },

    goToShopingCartPage: function(event){
        location.href="cart.html?"+"txt="+encodeURI(Controller.petInCart);
    }
};


window.onload = function() {  
    alert('hello');
    var cartValue = getCartCookieValue("YY");
    var lengthOfCartCookie = cartValue.split(',').length;
    document.getElementById("shop-cart-index").innerText = parseInt(lengthOfCartCookie/7)
    Controller.petInCart.push()
    var value = getCookieValue("userName");  
    // console.log(value);
    if(value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login";     
    } else {
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
        Controller.userId = value[0];
    }
    Controller.initWeb3();

}
