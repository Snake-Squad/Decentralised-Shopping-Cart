CheckOut = {
    web3Provider: null,
    contracts: {},
    petInCart:[],

    initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
    CheckOut.web3Provider = web3.currentProvider;
        } else {
        // If no injected web3 instance is detected, fall back to Ganache
        CheckOut.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
    
       web3 = new Web3(CheckOut.web3Provider);
       // alert("web3 Initialized");

        return CheckOut.initContract();
    },

    initContract: function() {
    $.getJSON('CheckOut.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var CheckOutArtifact = data;
      CheckOut.contracts.CheckOut = TruffleContract(CheckOutArtifact);

      // Set the provider for our contract
      CheckOut.contracts.CheckOut.setProvider(CheckOut.web3Provider);

      // alert("Contract Initialized");
      // Use our contract to retrieve and mark the adopted pets
      return CheckOut.pay();
    }); 
  },

    pay: function(event) {
        // ---------------   retrieve data from webpage
        // load itme address as a list here
        var items = [];
        var names = document.getElementsByClassName("product-title");
        // console.log(names);

        for (var i = 0; i < names.length - 1; i++) {
            items.push(names[i].childNodes[0].data);
        }

        // console.log(items);

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

            CheckOut.contracts.CheckOut.deployed().then(function(instance) {
                // alert("Here ");
                CheckOutInstance = instance;
                return CheckOutInstance.setTransaction(
                    "0x2c6315b775d00007935b3760af5f48f0a9f5a960", 
                    ["0x2c6315b775d00007935b3760af5f48f0a9f5a95a", 
                    "0x2c6315b775d00007935b3760af5f48f0a9f5a95b"], 
                    seller, buyer, total, {gas:3000000});

            }).then(function(result) {
                return CheckOut.showTransaction("0x2c6315b775d00007935b3760af5f48f0a9f5a960");
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },

    showTransaction: function(address) {
        // alert(address)
        var CheckOutInstance;

        CheckOut.contracts.CheckOut.deployed().then(function(instance) {
        CheckOutInstance = instance;
            return CheckOutInstance.getTransaction(address);
        }).then(function(result) {
            console.log(result);
            if (result[0] != "") {
            var balence1 = 1000 - parseInt(result[3]);
            var balence2 = 1000 + parseInt(result[3]);
            $("#buyerTrans").html('Item: ' + result[0] + 
                ' From: ' + result[1] + '\n' +
                ' Price:' + result[3] +
                ' Balence: '+' $' + balence1);
            $("#sellerTrans").html('Item: ' + result[0] + 
                ' To: ' + result[2] + '\n' +
                ' Price:' + result[3] +
                ' Balence: '+' $' +  balence2);
            }
        }).catch(function(err) {
            console.log(err.message);
        });
    }
};

function checkOut() {
    CheckOut.initWeb3();
}
