Controller = {
    web3Provider: null,
    contracts: {},
    username: null,
    userId: null,
    amount: null,

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
            console.log(data);
            // Instantiate it with truffle-contract
            Controller.contracts.Controller = 
                TruffleContract(ControllerArtifact);
            // Set the provider for our contract
            Controller.contracts.Controller.setProvider(
                Controller.web3Provider);
            return Controller.showBalance();
        });
    },

    showBalance: function() {
        Controller.contracts.Controller.deployed().then(function(instance) {
            var userId = Controller.userId;
            console.log("userID = ", userId);
            return instance.getAccount(userId);
        }).then(function(result) {
            console.log("stored on block chain:", result);
            $("#userEmail").html(Controller.username);
            $("#userBalance").html("Balance: $" + result[2]["c"][0]);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    recharge: function() {
        var userId = Controller.userId;
        var amount = Controller.amount;
        console.log(userId, amount);
        // -------------------------------
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            } else {
                var account = accounts[0];
                Controller.contracts.Controller.deployed()
                    .then(function(instance) {
                        return instance.recharge(userId, amount, {gas:3000000});
                }).then(function(result) {
                    console.log("After recharge:", result);
                    return Controller.refresh();
                }).catch(function(err) {
                    console.log(err.message);
                });
            }
        });
    },

    refresh: function() {
        location.reload();
    }
};


// While Recharge Button is clicked
$("#rechargeButton").click(function() {
    Controller.amount = $("#rechargeInput").val();
    console.log(Controller.username, Controller.userId, Controller.amount);
    Controller.recharge();
});

// get cookie while on this page
window.onload = function() {  
    var value = getCookieValue("userName");  
    console.log(value);
    if (value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login"; 
    } else {
        Controller.username = value[0];
        Controller.userId = value[1];
        Controller.initWeb3();
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
    }
}
