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
        var puppyIds = [];
        for (var i = 0; i < Logout.puppiesInCart.length; i++) {
            //var info = ; 
            var pId = Logout.puppiesInCart[i].split(',')[7];
            puppyIds.push(pId);
        }
        console.log(puppyIds);
        console.log(Logout.userId);

        // ---------------------------------------------------------------------
        // Logout.contracts.Controller.deployed().then(function(instance) {
        //     return instance.getAccount(userId);
        // }).then(function(result) {
        //     console.log("stored on block chain:", result);
        // }).catch(function(err) {
        //     console.log(err.message);
        // });
    }

//     refresh: function() {
//         //delete_cookie("userName"); 
//         location.reload();
//     }
};




function logout() {
    var value = getCookieValue("userName");
    Logout.userId = value[1];
    Logout.puppiesInCart = getCartCookie();
    Logout.initWeb3();
}
