pragma solidity ^0.4.21;

/**
 * @title Controller.
 * @author Yufei Zhang
 */
contract Controller {
    
    /*--------------------------------------------------------------------------
     * Define all of the structures we are going to store in block chain.
     *--------------------------------------------------------------------------
     */
    struct Account {
        address cartId;          // an address point to a shopping cart
        address prodCartId;      // an address point to puppies a user sopports
        address[] transactions;  // a list of Transaction
        uint balance;
    }
    
    struct Cart {
        address[] puppies;       // a list of items that are going to check out
    }
    
    struct Product {
        address[] puppies;       // a list of items that are uploaded by a user
    }
    
    struct Puppy {
        string name;             // name of the puppy
        string breed;            // breed of the puppy
        uint age;                // age of the puppy
        string birthPlace;       // birth place of the puppy
        uint256 price;           // price of the puppy
        string image;            // image url of the puppy
        bool onSale;             // status of a puppy
    }
    
    struct Transaction {
        address[] puppiesIds;    // id of multiple puppies
        address seller;          // address of the seller
        address buyer;           // address of the buyer
        uint256 price;           // total price in the trade
    }
    
    /*--------------------------------------------------------------------------
     * Define all of the mappings that we are going to use。
     *--------------------------------------------------------------------------
     */
    mapping (address => Account) accountsOnBC;
    mapping (address => Cart) cartsOnBC;
    mapping (address => Product) productsOnBC;
    mapping (address => Puppy) puppiesOnBC;
    mapping (address => Transaction) transactionsOnBC;
    address[] allPuppies;
    
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of an Account.
     *--------------------------------------------------------------------------
     */
    function setAccount(
        address _accountId,
        address _cartId, 
        address _prodCartId, 
        uint256 _balance
    ) 
        public 
    { 
        var account = accountsOnBC[_accountId];
        account.cartId = _cartId;
        account.prodCartId = _prodCartId;
        account.balance = _balance;
        setCart(_cartId, new address[](0));
        setProduct(_prodCartId, new address[](0));
    }
   
    function getAccount(address _accountId) 
        view 
        public 
        returns (
            address[], 
            address[], 
            uint256
        ) 
    {
        address cId = accountsOnBC[_accountId].cartId;
        address pId = accountsOnBC[_accountId].prodCartId;
        return (
            cartsOnBC[cId].puppies, 
            productsOnBC[pId].puppies,
            accountsOnBC[_accountId].balance
        );
    } 
    
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of a Cart.
     *--------------------------------------------------------------------------
     */
    function setCart(address _cartId, address[] _puppiesIds) public {
        cartsOnBC[_cartId].puppies =  _puppiesIds;
    }
    
    function getCart(address _cartId) view public returns (address[]) {
        return (cartsOnBC[_cartId].puppies);
    }
    
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of an product.
     *--------------------------------------------------------------------------
     */
    function setProduct(address _productId, address[] _puppiesIds) public {
        productsOnBC[_productId].puppies =  _puppiesIds;
    }
    
    function getProducts(address _productId) view public returns (address[]) {
        return (productsOnBC[_productId].puppies);
    }
    
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of a Puppy.
     *--------------------------------------------------------------------------
     */
    function setPuppy(
        address _puppyId,
        string _name,
        string _breed,
        uint _age,
        string _birthPlace,
        uint256 _price,
        string _image,
        bool _onSale
    ) 
        public 
    { 
        var puppy = puppiesOnBC[_puppyId];
        puppy.name = _name;
        puppy.breed = _breed;
        puppy.age = _age;
        puppy.birthPlace = _birthPlace;
        puppy.price = _price;
        puppy.image = _image;
        puppy.onSale = _onSale;
    }
   
    function getPuppy(address _puppyId) 
        view 
        public 
        returns (
            string, 
            string, 
            uint,
            string,
            uint256,
            string,
            bool
        ) 
    {
        return (
            puppiesOnBC[_puppyId].name, 
            puppiesOnBC[_puppyId].breed, 
            puppiesOnBC[_puppyId].age,
            puppiesOnBC[_puppyId].birthPlace,
            puppiesOnBC[_puppyId].price,
            puppiesOnBC[_puppyId].image,
            puppiesOnBC[_puppyId].onSale
        );
    }
     
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of a Transaction.
     *--------------------------------------------------------------------------
     */
    function setTransaction(
        address _transId,
        address[] _puppiesIds, 
        address _seller, 
        address _buyer, 
        uint256 _price
    ) 
        public 
    { 
        var transaction = transactionsOnBC[_transId];
        transaction.puppiesIds = _puppiesIds;
        transaction.seller = _seller;
        transaction.buyer = _buyer;
        transaction.price = _price;
    }
   
    function getTransaction(address _transId) 
        view 
        public 
        returns (
            address[], 
            address, 
            address,
            uint256
        ) 
    {
        return (
            transactionsOnBC[_transId].puppiesIds, 
            transactionsOnBC[_transId].seller, 
            transactionsOnBC[_transId].buyer,
            transactionsOnBC[_transId].price
        );
    }
    
    /*--------------------------------------------------------------------------
     * Define othere functions that will be used in the block chain.
     *--------------------------------------------------------------------------
     */
    function recharge(address _userId, uint256 _price) public {
        accountsOnBC[_userId].balance = accountsOnBC[_userId].balance + _price;
    }
    
    function checkOut(
        // these will be store in a trasaction
        address _transId,
        address[] _puppiesIds,
        address _seller,
        address _buyer,
        uint256 _price,
        // these are helping to update cart and product
        address _cartId,
        address _prodCartId,
        address[] _cart,
        address[] _prodCart
    ) 
        public
    {
        // update balance
        accountsOnBC[_seller].balance = accountsOnBC[_seller].balance + _price;
        accountsOnBC[_buyer].balance = accountsOnBC[_buyer].balance - _price;
        // record transaction
        setTransaction(_transId, _puppiesIds, _seller, _buyer, _price);
        accountsOnBC[_seller].transactions.push(_transId);
        accountsOnBC[_buyer].transactions.push(_transId);
        // update cart and prodcart
        accountsOnBC[_buyer].cartId = _cartId;
        setCart(_cartId, _cart);
        accountsOnBC[_seller].prodCartId = _prodCartId;
        setProduct(_prodCartId, _prodCart);
        // update Puppy Status will be done via JavaScript
    }
    
    function addPuppy(
        address _sellerId,
        address _puppyId,
        string _name,
        string _breed,
        uint _age,
        string _birthPlace,
        uint256 _price,
        string _image
    )
        public 
    {
        setPuppy(
            _puppyId, 
            _name, 
            _breed, 
            _age, 
            _birthPlace, 
            _price, 
            _image, 
            true
        );
        address prodCartId = accountsOnBC[_sellerId].prodCartId;
        productsOnBC[prodCartId].puppies.push(_puppyId);
        allPuppies.push(_puppyId);
    }
    
    function markSoldPuppy(address _puppyId) public {
        puppiesOnBC[_puppyId].onSale = false;
    }
    
    function getPuppyList() view public returns (address[]) {
        return (allPuppies);
    }
}