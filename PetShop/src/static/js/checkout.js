Controller = {  
    web3Provider: null,
    contracts: {},
    userId: null,

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
            var ControllerArtifact = data;
            Controller.contracts.Controller = TruffleContract(ControllerArtifact);

            // Set the provider for our contract
            Controller.contracts.Controller.setProvider(Controller.web3Provider);

            alert("Contract Initialized");
            // Use our contract to retrieve and mark the adopted pets
            return Controller.pay();
        }); 
    },

    pay: function(event) {
        // ---------------   retrieve data from webpage
        Controller.userId = getCookieValue("userName")[1];
        console.log(Controller.userId);

        // load itme address as a list here
        var items = [];
        var names = document.getElementsByClassName("product-title");
        // console.log(names);
        console.log("userId = ", Controller.userId);

        for (var i = 0; i < names.length - 1; i++) {
            items.push(names[i].childNodes[0].data);
        }

        console.log(items);

        // retrieve seller address, we can store this info in session
        var seller = "0x2c6315b775d00007935b3760af5f48f0a9f5a950";

        // retrieve buyer address, we can store this info in cookie
        var buyer = "0x2c6315b775d00007935b3760af5f48f0a9f5a951";

        // retrieve total prise;
        var totalDiv = $('.totals-value');
        var total = parseFloat(totalDiv[3].childNodes[0].data);

        console.log(items, seller, buyer, total);

        // -------------------------------
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }

            var account = accounts[0];
            // alert(account);

            Controller.contracts.Controller.deployed().then(function(instance) {
                alert("Here ");
                ControllerInstance = instance;
                return ControllerInstance.recharge(
                    "0x2c6315b775d00007935b3760af5f48f0a9f5a960", 10000, {gas:3000000}
                );
            }).then(function(result) {
                return Controller.showTransaction("0x2c6315b775d00007935b3760af5f48f0a9f5a960");
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },

    showTransaction: function(address) {
        alert(address)
        var ControllerInstance;

        Controller.contracts.Controller.deployed().then(function(instance) {
        ControllerInstance = instance;
            return ControllerInstance.getAccount(address);
        }).then(function(result) {
            console.log(result);
            // if (result[0] != "") {
            // var balence1 = 1000 - parseInt(result[3]);
            // var balence2 = 1000 + parseInt(result[3]);
            // $("#buyerTrans").html('Item: ' + result[0] + 
            //     ' From: ' + result[1] + '\n' +
            //     ' Price:' + result[3] +
            //     ' Balence: '+' $' + balence1);
            // $("#sellerTrans").html('Item: ' + result[0] + 
            //     ' To: ' + result[2] + '\n' +
            //     ' Price:' + result[3] +
            //     ' Balence: '+' $' +  balence2);
            // }
        }).catch(function(err) {
            console.log(err.message);
        });
    }
};

function checkOut() {
    Controller.initWeb3();
}
