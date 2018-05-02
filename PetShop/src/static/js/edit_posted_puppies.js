Controller = {
    web3Provider: null,
    contracts: {},
    userId: null,
    puppyList: null,
    onSales: [],
    target: null,

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
            // Instantiate it with truffle-contract
            Controller.contracts.Controller = 
                TruffleContract(ControllerArtifact);
            // Set the provider for our contract
            Controller.contracts.Controller.setProvider(
                Controller.web3Provider);
            return Controller.getPuppyList();
        });
    },

    getPuppyList: function() {
        Controller.contracts.Controller.deployed().then(function(instance) {;
            return instance.getAccount(Controller.userId);
        }).then(function(account) {
            Controller.puppyList = account[1];
            console.log("puppyList:", Controller.puppyList);
            if (Controller.puppyList.length > 0)
                return Controller.isOnSale(0);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    isOnSale: function(i) {
        if (i == Controller.puppyList.length)
            return Controller.showOnSales();
        var puppyId = Controller.puppyList[i];
        return Controller.getPuppyInfo(puppyId, i);
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
        console.log("Details of all puppies:", data);
        return Controller.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-edit', Controller.handleEdit);
        $(document).on('click', '.goToShopingCartPage', Controller.goToShopingCartPage);
    },

    handleEdit: function(event) {
        var idx = parseInt($(event.target).data('id'));
        console.log("index =", idx);
        Controller.target = Controller.onSales[idx];
        console.log("Edit ->:", Controller.target);
    },

    goToShopingCartPage: function(event){
        location.href="http://localhost:3000/cart.html";
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
        Controller.userId = value[1];
    }
    Controller.initWeb3();
}
