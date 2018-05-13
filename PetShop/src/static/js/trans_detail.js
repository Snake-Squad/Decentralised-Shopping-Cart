Controller = {  
    web3Provider: null,
    contracts: {},
    userId: null,
    transId: null,
    petList: [],
    puppies: [],

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
            return Controller.getTargetPuppies();
        }); 
    },

    getTargetPuppies: function() {
        Controller.transId = localStorage.transId;
        Controller.petList = localStorage.transPuppyIds.split(',');
        console.log(Controller.petList);
        return Controller.getPuppies(0);
    },

    getPuppies: function(i) {
        if (i == Controller.petList.length) {
            return Controller.showPuppies();
        }
        Controller.contracts.Controller.deployed().then(function(instance) {
            return instance.getPuppyInfo(Controller.petList[i]);
        }).then(function(result) {
            Controller.puppies.push(result);
            return Controller.getPuppies(i + 1);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    showPuppies: function() {
        console.log(Controller.transId);
        console.log(Controller.puppies);
        var puppies = Controller.puppies;
        var cartRow = $('#productRow');
        var cartTemplate = $('#product-none');
        var subTotal = 0;
        var tax = 0;
        var grandTotal = 0;
        // ---------------------------------------------------------------------
        $('#h1TransId').text(Controller.transId);
        for (i = 0; i < puppies.length; i ++) {
            var info = puppies[i];
            cartTemplate.find('.product-title').text(info[1]);
            cartTemplate.find('.product-description').text("breed: " + info[2]);
            cartTemplate.find('.product-description1').text("age: " + info[3]);
            cartTemplate.find('.product-description2').text("location: " + info[4]);
            cartTemplate.find(".product-price").text(info[5]);
            cartTemplate.find('img').attr('src', info[6]);
            cartTemplate.find(".product-quantity").find('input').attr("value", 1);
            cartTemplate.find(".product-line-price").text(info[5]);
            cartRow.append(cartTemplate.html());
            subTotal += parseInt(info[5]);
            tax += Math.round(parseInt(info[5]) * 0.05);
        };
        grandTotal = subTotal + tax + 15;
        return Controller.getMailing(
            Controller.userId, subTotal, tax, grandTotal
        );
    },


    getMailing: function(userId, subTotal, tax, grandTotal) {
        var config = {
            apiKey: "AIzaSyBzvcZDres2eUAUX6PBHRlo858ftMznDKs",
            authDomain: "comp9900-4b79d.firebaseapp.com",
            databaseURL: "https://comp9900-4b79d.firebaseio.com",
            projectId: "comp9900-4b79d",
            storageBucket: "comp9900-4b79d.appspot.com",
            messagingSenderId: "445311599888"
        };
        firebase.initializeApp(config);
        
        // get user's email and password from the webpage
        var users = firebase.database().ref().child('users');

        // This must be the last function of all
        users.on("value", function(snapshot) {
            snapshot.forEach(function(user) {
                var userVal = user.val(); // user's info (email, fn, ln, pw, role)
                // check whether it matches or not
                if (userVal.user_id == userId) {
                    var mailingAddr = userVal.suite + ", " + userVal.street + ", " +
                        userVal.state + ", " + userVal.country + ", " + userVal.zip;
                    console.log(mailingAddr);
                    return Controller.showCost(
                        subTotal, tax, grandTotal, mailingAddr
                    );
                }
            });
        });
    },


    showCost: function(subTotal, tax, grandTotal, mailing) {
        console.log(subTotal, tax, grandTotal);
        $('#cart-subtotal').html(subTotal);
        $('#cart-tax').html(tax);
        $('#cart-shipping').html(15.00);
        $('#cart-total').html(grandTotal);
        $('#cart-mailing').html(mailing);
        return Controller.bindEvents();
    },


    bindEvents: function() {
        $(document).on('click', '#btnBack', Controller.backToTrans);
    },

    backToTrans: function(event) {
        event.preventDefault();
        localStorage.setItem('transId', "");
        localStorage.setItem('transPuppyIds', "");
        window.location.replace("http://localhost:3000/transaction.html");
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