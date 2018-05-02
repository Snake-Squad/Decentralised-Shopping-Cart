Controller = {
    web3Provider: null,
    contracts: {},
    userId: null,
    onSales: {},
    //petInCart:[],

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
            return Controller.getAllPuppiesOnBC();
        });
    },

    getAllPuppiesOnBC: function() {
        Controller.contracts.Controller.deployed().then(function(instance) {;
            return instance.getPuppyList();
        }).then(function(result) {
            console.log("Puppy List:", result);
            return Controller.showOnSalePuppies(result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    showOnSalePuppies: function(data) {
        for (var i = 0;i < data.length; i++) {
            console.log(data[i]);
            Controller.contracts.Controller.deployed().then(
                function(instance) {;
                    return instance.getPuppy();
        }).then(function(result) {
            console.log("Puppy List:", result);
            return Controller.showOnSalePuppies(result);
        }).catch(function(err) {
            console.log(err.message);
        });

        }
        // $.getJSON('../pets.json', function(data) {
        //     console.log(data);
        // var petsRow = $('#petsRow');
        // var petTemplate = $('#petTemplate');

        // for (i = 0; i < data.length; i ++) {
        //     petTemplate.find('.panel-title').text(data[i].name);
        //     petTemplate.find('img').attr('src', data[i].picture);
        //     petTemplate.find('.pet-breed').text(data[i].breed);
        //     petTemplate.find('.pet-age').text(data[i].age);
        //     petTemplate.find('.pet-location').text(data[i].location);
        //     // petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        //     petTemplate.find('.btn-add').attr('data-id', data[i].id);
        //     petsRow.append(petTemplate.html());
        // }
        // });
        //return App.initWeb3();
    },









  bindEvents: function() {
    // $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '.btn-add', App.handleAdd);
    $(document).on('click', '.goToShopingCartPage', App.goToShopingCartPage);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdd: function(event){
    event.preventDefault();
    var index = document.getElementById("shop-cart-index");
    index.innerText++;
    var petId = parseInt($(event.target).data('id'));
    $.getJSON('../pets.json', function(data) {
      let pet = data.filter(e=>{
        if(e.id===petId)return e;
      });
      App.petInCart.push(pet[0].id);
    });
  },

  goToShopingCartPage: function(event){
    location.href="cart.html?"+"txt="+encodeURI(App.petInCart);
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      alert(account);

      App.contracts.Adoption.deployed().then(function(instance) {
        alert("Here ");
        adoptionInstance = instance;
        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
};

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });

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
        Controller.userId = value[0];
        Controller.initWeb3();
    } 
}
