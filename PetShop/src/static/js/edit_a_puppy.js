Controller = {
    web3Provider: null,
    contracts: {},
    puppyId: null,
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
            return Controller.setAPuppy();
        });
    },

    showCurrentInfo: function() {
        $("#imgOfPuppy").attr('src', Controller.image);
        $("#inputName").attr('value', Controller.name);
        $("#inputBreed").attr('value', Controller.breed);
        $("#inputAge").attr('value', Controller.age);
        $("#inputBirthPlace").attr('value', Controller.birthPlace);
        $("#inputPrice").attr('value', Controller.price);
    }, 

    setAPuppy: function() {
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
                        return instance.setPuppy(
                            Controller.puppyId,
                            Controller.sellerId,
                            Controller.name,
                            Controller.breed,
                            Controller.age,
                            Controller.birthPlace,
                            Controller.price,
                            Controller.image,
                            true, 
                            {gas:3000000}
                        );
                }).then(function(result) {
                    console.log("Successfully Added to Block Chain.", result);
                    return Controller.backToPrevPage();
                }).catch(function(err) {
                    console.log(err.message);
                });
            }
        });
    },

    backToPrevPage: function() {
        deleteEditCookie()
        window.location.replace(
            "http://localhost:3000/edit_posted_puppies.html");
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
    var isValid = true;
    //name
    if (name=="") {
        isValid=false;
        alert("The name is Null. Please input puppy's name")
    } else {
        if (/[A-Z]/.test(name[0])) {
            if (!(/^[A-Za-z _]+$/).test(name)) {
                isValid=false;
                alert("The name should only contain letters");
            }
        } else {
            isValid=false;
            alert("The name should be start with capital letter");
        }
    }

    //breed
    if (breed == "") {
        isValid=false;
        alert("The breed is Null. Please input puppy's breed");
    } else {
        if (/[A-Z]/.test(breed[0])) {
            if (!(/^[A-Za-z _]+$/).test(breed)) {
                isValid=false;
                alert("The breed should only contain letters");
            }
        } else {
            isValid=false;
            alert("The breed should be start with capital letter");
        }
    }

    //age
    if (age == "") {
        isValid=false;
        alert("The age is Null. Please input puppy's age");
    } else {
        if (/^[A-Za-z]+$/.test(age)) {
            isValid=false;
            alert("The age is wrong with letters");
        } else {
            if (age>40) {
                isValid=false;
                alert("Your Puppy lives beyond record");
            }
        }
    }

    // birthPlace
    if (birthPlace == "") {
        isValid=false;
        alert("The BirthPlace is Null. Please input puppy's BirthPlace")
    } else {
        if (/[A-Z]/.test(birthPlace[0])) {
            if(!(/^[A-Za-z _]+$/).test(birthPlace)){
                isValid=false;
                alert("The BirthPlace should only contain letters");
            }
        } else {
            isValid=false;
            alert("The BirthPlace should be start with capital letter");
        }
    }

    //    price = parseInt($("#inputPrice").val());
    if (price == "") {
        isValid=false;
        alert("The price is Null. Please input puppy's price");
    } else {
        if(/^[A-Za-z]+$/.test(price)) {
            isValid=false;
            alert("The price don't contain letters");
        }
    }
      
    // image
    var defaultimage = "https://cdn.filestackcontent.com/wxLPFKkLRZmumTng5O7e"
    if (image==defaultimage) {
        isValid=false;
        alert("You should upload your puppy's image for buyers");
    }

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


//judge the value is int
function isInt(value) {
  if (isNaN(value)) return false;
  var x = parseFloat(value);
  return (x | 0) === x;
}


// While Confrim Button is clicked
$("#btnConfirm").click(function() {
    checkValidation();
});


// Once the page is load run this
window.onload = function() {  
    var value = getCookieValue("userName");
    var puppy = getEditCookie();
    console.log(value, puppy);
    if (value === undefined || value == null || value.length == 0) {
        document.getElementById("login_navabar").text = "Login"; 
    } else {
        Controller.sellerId = value[1];
        Controller.sellerId = puppy[0];
        Controller.name = puppy[1];
        Controller.breed = puppy[2];
        Controller.age = puppy[3];
        Controller.birthPlace = puppy[4];
        Controller.price = puppy[5];
        Controller.image = puppy[6];
        Controller.puppyId = puppy[7];
        document.getElementById("loginnavbarDropdown").text = value[0];  
        document.getElementById("loginnavbarDropdown").style.display = 'block';
        document.getElementById("login_navabar").style.display = 'none';
        document.getElementById("signup_navabar").style.display = 'none';
        Controller.showCurrentInfo();
    }
}
