Controller = {
    web3Provider: null,
    contracts: {},
    sellerId: null,
    name: null,
    breed: null,
    age: null,
    birthPlace: null,
    price: null,
    image: null,

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
            return Controller.addAPuppy();
        });
    },

    addAPuppy: function() {
        var puppyId = generateAddress();
        console.log(puppyId, Controller.sellerId, 
            Controller.name, Controller.breed, Controller.age, 
            Controller.birthPlace, Controller.price, Controller.image
        );

        // ---------------------------------------------------------------------
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            } else {
                var account = accounts[0];
                Controller.contracts.Controller.deployed()
                    .then(function(instance) {
                        return instance.addPuppy(
                            puppyId,
                            Controller.sellerId,
                            Controller.name,
                            Controller.breed,
                            Controller.age,
                            Controller.birthPlace,
                            Controller.price,
                            Controller.image, 
                            {gas:3000000}
                        );
                }).then(function(result) {
                    console.log("Successfully Added to Block Chain.", result);
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


// before adding a puppy, check the valiation of all inputs varables.
// None of the inputs can be empty.
function checkValidation() {
    // retrieve data from UI
    var name = $("#inputName").val();
    var breed = $("#inputBreed").val();
    var age = parseInt($("#inputAge").val());
    var birthPlace = $("#inputBirthPlace").val();
    var price = parseInt($("#inputPrice").val());
    var image = $("#imgOfPuppy").attr("src");
    console.log(name, breed, age, birthPlace, price, image);

    // TODO: Check validation of each input
    var isValid = false;



    isValid = true; // this is only for testing
    
    // if all inputs are valid, add the puppy to block chain
    if (isValid) {
        Controller.name = name;
        Controller.breed = breed;
        Controller.age = age;
        Controller.birthPlace = birthPlace;
        Controller.price = price;
        Controller.image = image;
        Controller.initWeb3();
    }

}


// While Confrim Button is clicked
$("#btnUploadImg").click(function() {
    alert("Upload Image")
});

// While Confrim Button is clicked
$("#btnConfirm").click(function() {
    checkValidation();
});


// Once the page is load run this
window.onload = function() {  
    var value = getCookieValue("userName");  
    console.log(value);
    if (value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login"; 
    } else {
        Controller.sellerId = value[1];
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
    }
}
