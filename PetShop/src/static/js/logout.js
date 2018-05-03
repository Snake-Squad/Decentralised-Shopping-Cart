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
        console.log("setCurCart: ", Logout.userId, Logout.puppiesInCart);
        // Controller.contracts.Controller.deployed().then(function(instance) {
        //     console.log("setCurCart", Controller.userId, Controller.puppies);
        //     //return instance.getAccount(userId);
        // }).then(function(result) {
        //     console.log("stored on block chain:", result);
        // }).catch(function(err) {
        //     console.log(err.message);
        // });
    },

//     recharge: function() {
//         var userId = Controller.userId;
//         var amount = Controller.amount;
//         console.log(userId, amount);
//         // -------------------------------
//         web3.eth.getAccounts(function(error, accounts) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 var account = accounts[0];
//                 Controller.contracts.Controller.deployed()
//                     .then(function(instance) {
//                         return instance.recharge(userId, amount, {gas:3000000});
//                 }).then(function(result) {
//                     console.log("After recharge:", result);
//                     return Controller.refresh();
//                 }).catch(function(err) {
//                     console.log(err.message);
//                 });
//             }
//         });
//     },

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
