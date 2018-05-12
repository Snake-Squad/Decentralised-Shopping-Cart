Controller = {
    web3Provider: null,
    contracts: {},
    userId: null,
    puppyList: null,
    onSales: [],
    validOnSales: [],
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
            return Controller.handleSearch();
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
            info.push(puppyId);
            Controller.onSales.push(info);
            // console.log(info);
            return Controller.isOnSale(i + 1);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    handleSearch: function () {
        // console.log("all onSales", Controller.onSales);
        // console.log("localStorage", localStorage);
        var searchkey = localStorage.getItem("searchKey");
        var searchResult = [];
        if (searchkey != "") {
            var data= Controller.onSales;
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (typeof(data[i][j]) == "string") {
                        if(data[i][j].toLowerCase() == searchkey) {
                            searchResult.push(data[i]);
                            break
                        }
                    } else {
                        if(Object.values(data[i][j])[2][0] == searchkey) {
                            searchResult.push(data[i]);
                            break;
                        }
                    }
                }
            }
            // console.log(searchResult);
            Controller.onSales = searchResult;
            localStorage.setItem("searchKey", "");
        }
        return Controller.showOnSales();
    },

    // -------------------------------------------------------------------------
    showOnSales: function() {
        var data = Controller.onSales;
        // console.log("Data: ",data);
        var userId = getCookieValue("userName");
        var petsRow = $('#petsRow');
        var petTemplate = $('#petTemplate');
        for (i = 0; i < data.length; i ++) {
            if(data[i][0] != userId[1]) {
                Controller.validOnSales.push(data[i]);
                petTemplate.find('.panel-title').text(data[i][1]);
                petTemplate.find('.pet-breed').text(data[i][2]);
                petTemplate.find('.pet-age').text(data[i][3]);
                petTemplate.find('.pet-location').text(data[i][4]);
                petTemplate.find('.pet-price').text(data[i][5]);
                petTemplate.find('img').attr('src', data[i][6]);
                petTemplate.find('.btn-add').attr('data-id', i).attr('id', data[i][7]);
                petsRow.append(petTemplate.html());
            }           
        }
        return Controller.markAdded();
    },

    markAdded: function() {
        var onSales = Controller.validOnSales;
        var petInCart = Controller.petInCart;
        for (var i = petInCart.length - 1; i >= 0; i--) {
            var isBad = true;
            var petAddr = petInCart[i].split(',')[7];
            console.log(petAddr);
            if(onSales.length == 0){
                petInCart.splice(i,1);
                $("#shop-cart-index").html(petInCart.length);
            }
            
            for (var j = 0; j < onSales.length; j++) {
                // console.log(onSales[j][7]);
                if (petAddr == onSales[j][7]) {
                    // console.log("added", petAddr);
                    $('#'+petAddr).text('Added').attr('disabled', true);
                    isBad = false;
                    break;
                }else{
                    petIncart.splice(i,1);
                    $("#shop-cart-index").html(petInCart.length);
                }
            }
            if (isBad) {
                Controller.petInCart.pop();
            }
        }
        setCartCookie(Controller.petInCart, 7);
        return Controller.bindEvents();
    },

    // -------------------------------------------------------------------------
    bindEvents: function() {
        $(document).on('click', '.btn-add', Controller.handleAdd);
        $(document).on('click', '.goToShopingCartPage', Controller.goToShopingCartPage);
        $("#shop-cart-index").html(Controller.petInCart.length);
    },

    handleAdd: function(event) {
        event.preventDefault();
        var index = document.getElementById("shop-cart-index");
        var onSalesIndex = parseInt($(event.target).data('id'));
        var data = Controller.onSales[onSalesIndex].toString();
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
    Controller.initWeb3();
}
