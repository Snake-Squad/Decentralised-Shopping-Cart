Logout = {
    web3Provider: null,
    contracts: {},
    userId: null,
    puppiesInCart: null,
    
    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            Logout.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            Logout.web3Provider = new Web3.providers.HttpProvider(
                'http://localhost:7545');
        } 
        web3 = new Web3(Logout.web3Provider);
        return Logout.initContract();
    },

    initContract: function() {
        $.getJSON('Controller.json', function(data) {
            // Get the necessary contract artifact file
            var LogoutArtifact = data;
            // Instantiate it with truffle-contract
            Logout.contracts.Controller = 
                TruffleContract(LogoutArtifact);
            // Set the provider for our contract
            Logout.contracts.Controller.setProvider(
                Logout.web3Provider);
            return Logout.setCurCart();
        });
    },

    setCurCart: function() {
        var userId = Logout.userId;
        var puppyIds = [];
        for (var i = 0; i < Logout.puppiesInCart.length; i++) {
            //var info = ; 
            var pId = Logout.puppiesInCart[i].split(',')[7];
            puppyIds.push(pId);
        }
        var newCartId = generateAddress();
        console.log("userId = ", userId);
        console.log("newCartId = ", newCartId);
        console.log("puppiesInCart = ", puppyIds);
        

        // ---------------------------------------------------------------------
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            } else {
                var account = accounts[0];
                Logout.contracts.Controller.deployed().then(function(instance) {
                    console.log("instance", instance);
                    return instance.setCart(
                        userId, newCartId, puppyIds, {gas:3000000});
                }).then(function(result) {
                    return Logout.deleteCookie();
                }).catch(function(err) {
                    console.log(err.message);
                });
            }
        });
    },

    deleteCookie: function() {
        deleteCartCookie();
        delete_cookie("userName"); 
    }
};




function logout() {
    var value = getCookieValue("userName");
    Logout.userId = value[1];
    Logout.puppiesInCart = getCartCookie();
    Logout.initWeb3();
}
