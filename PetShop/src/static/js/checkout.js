Controller = {  
    web3Provider: null,
    contracts: {},
    userId: null,
    usIds: null,

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
            return Controller.fillter(0);
        }); 
    },

    fillter: function(iter) {
        if (iter == Controller.usIds.length) {
            return Controller.backToHome();
        }
        var curSId = Controller.usIds[iter];
        var curPrice = 0;
        var sellingPuppies = []; // store puppies sold by current saler
        var onSalePuppies = [];  // store puppies sold by others
        var inCartPuppyId = [];
        for (var i = 0; i < puppies.length; i++) {
            var puppyInfo = puppies[i].split(',');
            // console.log(puppyInfo);
            if (curSId == puppyInfo[0]) {
                curPrice += parseInt(puppyInfo[5]);
                sellingPuppies.push(puppyInfo[7]);
            } else {
                onSalePuppies.push(puppies[i]);
                inCartPuppyId.push(puppyInfo[7])
            }
        }
        puppies = onSalePuppies;
        console.log(curSId, sellingPuppies, curPrice * 1.05 + 15, puppies);
        return Controller.getSellerProdCart(
            iter, curSId, sellingPuppies, curPrice * 1.05 + 15, inCartPuppyId
        );
    },

    getSellerProdCart: function(iter, sellId, sellingPuppies, price, inCartPuppyId) {
        Controller.contracts.Controller.deployed().then(function(instance) {
            return instance.getAccount(sellId);
        }).then(function(result) {
            console.log(result);
            var prodCart = result[1];
            return Controller.pay(
                iter, sellId, sellingPuppies, price, prodCart, inCartPuppyId
            );
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    pay: function(iter, sellId, sellingPuppies, price, prodCart, inCartPuppyId) {
        console.log(sellId, sellingPuppies, price, prodCart, inCartPuppyId);
        var transId = generateAddress();
        var newCartId = generateAddress();
        var newProdCartId = generateAddress();
        // remove puppy from prodCart if the puppy is in sellingPuppies
        for (var i = sellingPuppies.length - 1; i >= 0; i--) {
            var index = prodCart.indexOf(sellingPuppies[i]);
            prodCart.splice(index, 1);
        }
        console.log(sellId, sellingPuppies, price, prodCart, inCartPuppyId);
        // -------------------------------
        web3.eth.getAccounts(function(error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            Controller.contracts.Controller.deployed().then(function(instance) {
                var now = getTime();
                console.log(now);
                now.toString();
                console.log(now);
                return instance.checkOut(
                    transId, sellingPuppies, sellId, Controller.userId, price, 
                    newCartId, newProdCartId, inCartPuppyId, prodCart, now,
                    {gas:3000000}
                );
            }).then(function(result) {
                return Controller.fillter(iter + 1);
            }).catch(function(err) {
                console.log(err.message);
            });
        });
    },

    backToHome: function() {
        setCartCookie(puppies, 7);
        window.location.replace("http://localhost:3000/");
    }
};


function getTime(){
    var myDate = new Date();
    myDate.getYear();        //获取当前年份(2位)
    myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    myDate.getDate();        //获取当前日(1-31)
    myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
    myDate.getHours();       //获取当前小时数(0-23)
    myDate.getMinutes();     //获取当前分钟数(0-59)
    myDate.getSeconds();     //获取当前秒数(0-59)
    myDate.getMilliseconds();    //获取当前毫秒数(0-999)
    myDate.toLocaleDateString();     //获取当前日期
    var mytime=myDate.toLocaleTimeString();     //获取当前时间
    var now = myDate.toLocaleString( );        //获取日期与时间
    return now;
}


$("#btn-checkout").click(function() {
    Controller.initWeb3();
});

