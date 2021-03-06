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
        address sellerId;        // the id of the seller
        string name;             // name of the puppy
        string breed;            // breed of the puppy
        uint age;                // age of the puppy
        string birthPlace;       // birth place of the puppy
        uint256 price;           // price of the puppy
        string image;            // image url of the puppy
        bool onSale;             // status of a Puppy
    }
        
    struct Transaction {
        address[] puppiesIds;    // id of multiple puppies
        address seller;          // address of the seller
        address buyer;           // address of the buyer
        uint256 price;           // total price in the trade
        string date;             // trade date
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
        setCart(_accountId, _cartId, new address[](0));
        setProduct(_accountId, _prodCartId, new address[](0));
    }
       
    function getAccount(address _accountId) 
        view 
        public 
        returns (
            address[], 
            address[], 
            uint256,
            address[]
        ) 
    {
        address cId = accountsOnBC[_accountId].cartId;
        address pId = accountsOnBC[_accountId].prodCartId;
        return (
            cartsOnBC[cId].puppies, 
            productsOnBC[pId].puppies,
            accountsOnBC[_accountId].balance,
            accountsOnBC[_accountId].transactions
        );
    } 
        
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of a Cart.
     *--------------------------------------------------------------------------
     */
    function setCart(
        address _userId,
        address _cartId,
        address[] _puppiesIds
    ) 
        public 
    {   
        accountsOnBC[_userId].cartId = _cartId;
        cartsOnBC[_cartId].puppies =  _puppiesIds;
    }
        
    function getCart(address _cartId) view public returns (address[]) {
        return (cartsOnBC[_cartId].puppies);
    }
        
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of an product.
     *--------------------------------------------------------------------------
     */
    function setProduct(
        address _userId,
        address _productId,
        address[] _puppiesIds
    ) 
        public 
    {
        accountsOnBC[_userId].prodCartId = _productId;
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
        address _sellerId,
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
        puppy.sellerId = _sellerId;
        puppy.name = _name;
        puppy.breed = _breed;
        puppy.age = _age;
        puppy.birthPlace = _birthPlace;
        puppy.price = _price;
        puppy.image = _image;
        puppy.onSale = _onSale;
    }
    
    function getPuppyInfo(address _puppyId) 
        view 
        public 
        returns (
            address,
            string, 
            string, 
            uint,
            string,
            uint256,
            string
        ) 
    {
        return (
            puppiesOnBC[_puppyId].sellerId,
            puppiesOnBC[_puppyId].name, 
            puppiesOnBC[_puppyId].breed, 
            puppiesOnBC[_puppyId].age,
            puppiesOnBC[_puppyId].birthPlace,
            puppiesOnBC[_puppyId].price,
            puppiesOnBC[_puppyId].image
        );
    }
    
    function getPuppyStatus(address _puppyId) view public returns (bool) {
        return (puppiesOnBC[_puppyId].onSale);
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
        uint256 _price,
        string _now
    ) 
        public 
    { 
        var transaction = transactionsOnBC[_transId];
        transaction.puppiesIds = _puppiesIds;
        transaction.seller = _seller;
        transaction.buyer = _buyer;
        transaction.price = _price;
        transaction.date = _now;
    }
       
    function getTransaction(address _transId) 
        view 
        public 
        returns (
            address[], 
            address, 
            address,
            uint256,
            string
        ) 
    {
        return (
            transactionsOnBC[_transId].puppiesIds, 
            transactionsOnBC[_transId].seller, 
            transactionsOnBC[_transId].buyer,
            transactionsOnBC[_transId].price,
            transactionsOnBC[_transId].date
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
        address[] _prodCart,
        // tradeTime
        string _now
    ) 
        public
    {
        // update balance
        accountsOnBC[_seller].balance = accountsOnBC[_seller].balance + _price;
        accountsOnBC[_buyer].balance = accountsOnBC[_buyer].balance - _price;
        // record transaction
        setTransaction(_transId, _puppiesIds, _seller, _buyer, _price, _now);
        accountsOnBC[_seller].transactions.push(_transId);
        accountsOnBC[_buyer].transactions.push(_transId);
        // update cart and prodcart
        setCart(_buyer, _cartId, _cart);
        setProduct(_seller, _prodCartId, _prodCart);
        // update Puppy Status 
        for (uint i = 0; i < _puppiesIds.length; i++) {
            markSoldPuppy(_puppiesIds[i]);
        }
    }
    
    function addPuppy(
        address _puppyId,
        address _sellerId,
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
            _sellerId,
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
