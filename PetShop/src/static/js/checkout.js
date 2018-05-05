Controller = {  
    web3Provider: null,
    contracts: {},
    userId: null,
    usIds: null,

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            Controller.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            Controller.web3Provider = 
                new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(Controller.web3Provider);
        return Controller.initContract();
    },

    initContract: function() {
        $.getJSON('Controller.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            Controller.contracts.Controller = TruffleContract(data);
            // Set the provider for our contract
            Controller.contracts.Controller.setProvider(
                Controller.web3Provider);
            // Use our contract to retrieve and mark the adopted pets
            return Controller.fillter(0);
        }); 
    },

    fillter: function(iter) {
        if (iter == Controller.usIds.length) {
            return Controller.backToHome();
        }
        var curSId = Controller.usIds[iter];
        var curPrice = 0;
        var sellingPuppies = []; // store puppies sold by current saler
        var onSalePuppies = [];  // store puppies sold by others
        var inCartPuppyId = [];
        for (var i = 0; i < puppies.length; i++) {
            var puppyInfo = puppies[i].split(',');
            // console.log(puppyInfo);
            if (curSId == puppyInfo[0]) {
                curPrice += parseInt(puppyInfo[5]);
                sellingPuppies.push(puppyInfo[7]);
            } else {
                onSalePuppies.push(puppies[i]);
                inCartPuppyId.push(puppyInfo[7])
            }
        }
        puppies = onSalePuppies;
        console.log(curSId, sellingPuppies, curPrice * 1.05 + 15, puppies);
        return Controller.getSellerProdCart(
            iter, curSId, sellingPuppies, curPrice * 1.05 + 15, inCartPuppyId
        );
    },

    getSellerProdCart: function(iter, sellId, sellingPuppies, price, inCartPuppyId) {
        Controller.contracts.Controller.deployed().then(function(instance) {
            return instance.getAccount(sellId);
        }).then(function(result) {
            console.log(result);
            var prodCart = result[1];
            return Controller.pay(
                iter, sellId, sellingPuppies, price, prodCart, inCartPuppyId
            );
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    pay: function(iter, sellId, sellingPuppies, price, prodCart, inCartPuppyId) {
        console.log(sellId, sellingPuppies, price, prodCart, inCartPuppyId);
        var transId = generateAddress();
        var newCartId = generateAddress();
        var newProdCartId = generateAddress();
        // remove puppy from prodCart if the puppy is in sellingPuppies
        for (var i = sellingPuppies.length - 1; i >= 0; i--) {
            var index = prodCart.indexOf(sellingPuppies[i]);
            prodCart.splice(index, 1);
        }
        console.log(sellId, sellingPuppies, price, prodCart, inCartPuppyId);
        // -------------------------------
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            Controller.contracts.Controller.deployed().then(function(instance) {
                return instance.checkOut(
                    transId, sellingPuppies, sellId, Controller.userId, price, 
                    newCartId, newProdCartId, inCartPuppyId, prodCart, 
                    {gas:3000000}
                );
            }).then(function(result) {
                return Controller.fillter(iter + 1);
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },

    backToHome: function() {
        setCartCookie(puppies, 7);
        window.location.replace("http://localhost:3000/");
    }
};


$("#btn-checkout").click(function() {
    Controller.initWeb3();
});

