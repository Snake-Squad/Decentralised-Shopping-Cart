Controller = {  
    web3Provider: null,
    contracts: {},
    userId: null,
    transList: [],
    transInfo: [],

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
            return Controller.getTransList();
        }); 
    },

    getTransList: function() {
        Controller.contracts.Controller.deployed().then(function(instance) {
            return instance.getAccount(Controller.userId);
        }).then(function(result) {
            console.log(result);
            Controller.transList = result[3];
            return Controller.getTransInfo(0);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    getTransInfo: function(i) {
        if (i == Controller.transList.length) {
            return Controller.showTransactions();
        }
        Controller.contracts.Controller.deployed().then(function(instance) {
            return instance.getTransaction(Controller.transList[i]);
        }).then(function(result) {
            Controller.transInfo.push(result);
            return Controller.getTransInfo(i + 1);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    showTransactions: function() {
        console.log(Controller.transInfo);
        var container = $('.container');
        var transTemplate = $('#transTemplate');

        for (var j = Controller.transInfo.length - 1; j >= 0; j--) {
            if (Controller.transInfo[j][1] == Controller.userId) {
                transTemplate.find('#h5UserID').text(
                    "From: " + Controller.transInfo[j][2]);
            } else {
                transTemplate.find('#h5UserID').text(
                    "To: " + Controller.transInfo[j][1]);
            }
            transTemplate.find('#strongPrice').text(
                "Price: " + Controller.transInfo[j][3]);
            transTemplate.find('#strongDate').text(
                "Date: " + Controller.transInfo[j][4]);
            transTemplate.find('#btnTransShowDetail').attr('data-id', j);
            container.append(transTemplate.html());
        }
        return Controller.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '#btnTransShowDetail', Controller.showDetail);
        $(document).on('click', '#navCart', Controller.showCart);
    },

    showDetail: function(event) {
        event.preventDefault();
        var index = parseInt($(event.target).data('id'));
        var petsIds = Controller.transInfo[index][0];
        localStorage.setItem('transId', Controller.transList[index]);
        localStorage.setItem('transPuppyIds', petsIds);
        localStorage.setItem('transMailing', Controller.transInfo[index][5]);
        console.log(localStorage);
        window.location.replace("http://localhost:3000/trans_detail.html");
    },

    showCart: function(event) {
        window.location.replace("http://localhost:3000/cart.html");
    } 
}


// onload function.
window.onload = function() {  
    var value = getCookieValue("userName");
    console.log(value);
    $("#transShowDetail").click( function() {
        alert(this);
    });
    if(value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login";     
    } else {
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
        Controller.userId = value[1];
        Controller.initWeb3();
    }
}