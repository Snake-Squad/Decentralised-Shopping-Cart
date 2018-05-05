Search = {
    web3Provider: null,
    contracts: {},
    userId: null,
    puppyList: null,
    onSales: [],

    initWeb3: function() {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            Search.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            Search.web3Provider = new Web3.providers.HttpProvider(
                'http://localhost:7545');
        } 
        web3 = new Web3(Search.web3Provider);
        // console.log("web3 initialized");
        return Search.initContract();
    },

    initContract: function() {
        $.getJSON('Controller.json', function(data) {
            // Get the necessary contract artifact file
            var SearchArtifact = data;
            // console.log(data);
            // Instantiate it with truffle-contract
            Search.contracts.Controller = 
                TruffleContract(SearchArtifact);
            // Set the provider for our contract
            Search.contracts.Controller.setProvider(
                Search.web3Provider);
            // console.log("Contract initialized");
            return Search.getAllPuppiesOnBC();
        });
    },

    // -------------------------------------------------------------------------
    getAllPuppiesOnBC: function() {
        Search.contracts.Controller.deployed().then(function(instance) {;
            return instance.getPuppyList();
        }).then(function(result) {
            Search.puppyList = result;
            // console.log("p on bc ->", result);
            if (result.length > 0) 
                return Search.isOnSale(0);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    isOnSale: function(i) {
        // console.log(i);
        if (i == Search.puppyList.length) {
            return Search.showOnSales();
        }

        var puppyId = Search.puppyList[i];
        Search.contracts.Controller.deployed().then(function(instance) {
            return instance.getPuppyStatus(puppyId);
        }).then(function(status) {
            if (status) {
                return Search.getPuppyInfo(puppyId, i);
            } else {
                return Search.isOnSale(i + 1);
            }
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    getPuppyInfo: function(puppyId, i) {
        // console.log(puppyId);
        Search.contracts.Controller.deployed().then(function(instance) {
            return instance.getPuppyInfo(puppyId);
        }).then(function(info) {
            info.push(puppyId);
            Search.onSales.push(info);
            // console.log(info);
            return Search.isOnSale(i + 1);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    showOnSales: function() {
        console.log("All onsale on BC in search.js", Search.onSales);
        return Search.onSales;
        // var data = Controller.onSales;
        // var petsRow = $('#petsRow');
        // var petTemplate = $('#petTemplate');
        // for (i = 0; i < data.length; i ++) {
        //     petTemplate.find('.panel-title').text(data[i][1]);
        //     petTemplate.find('.pet-breed').text(data[i][2]);
        //     petTemplate.find('.pet-age').text(data[i][3]);
        //     petTemplate.find('.pet-location').text(data[i][4]);
        //     petTemplate.find('.pet-price').text(data[i][5]);
        //     petTemplate.find('img').attr('src', data[i][6]);
        //     petTemplate.find('.btn-add').attr('data-id', i).attr('id', data[i][7]);
        //     petsRow.append(petTemplate.html());
        // }
    }
}
