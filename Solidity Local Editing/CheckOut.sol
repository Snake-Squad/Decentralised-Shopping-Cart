pragma solidity ^0.4.2;

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
        address[] cart;          // a list of puppy in the shopping cart
        address[] productions;   // a list of puppy for selling
        address[] transactions;  // a list of Transaction
        uint balance;
    }
    
    struct Puppy {
        string name;             // name of the puppy
        string breed;            // breed of the puppy
        uint age;                // age of the puppy
        string birthPlace;       // birth place of the puppy
        uint256 price;           // price of the puppy
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
    mapping (address => Puppy) puppiesOnBC;
    mapping (address => Transaction) transactionsOnBC;
    address[] public accountList;
    address[] public puppyList;
    address[] public transactionList;
    
    /*--------------------------------------------------------------------------
     * Define functions to set and get infomation of an Account.
     *--------------------------------------------------------------------------
     */
        function setAccount(
        address _accountId,
        address[] _cart, 
        address[] _productions, 
        uint256 _balance
    ) 
        public 
    { 
        var account = accountsOnBC[_accountId];
        account.cart = _cart;
        account.productions = _productions;
        account.balance = _balance;
        accountList.push(_accountId);
    }
    
    function getAccounts() view public returns (address[]) {
       return (accountList);
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
        return (
            accountsOnBC[_accountId].cart, 
            accountsOnBC[_accountId].productions, 
            accountsOnBC[_accountId].balance
        );
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
        uint256 _price
    ) 
        public 
    { 
        var puppy = puppiesOnBC[_puppyId];
        puppy.name = _name;
        puppy.breed = _breed;
        puppy.age = _age;
        puppy.birthPlace = _birthPlace;
        puppy.price = _price;
        puppyList.push(_puppyId);
    }
    
    function getPuppies() view public returns (address[]) {
       return (puppyList);
    }
   
    function getPuppy(address _puppyId) 
        view 
        public 
        returns (
            string, 
            string, 
            uint,
            string,
            uint256
        ) 
    {
        return (
            puppiesOnBC[_puppyId].name, 
            puppiesOnBC[_puppyId].breed, 
            puppiesOnBC[_puppyId].age,
            puppiesOnBC[_puppyId].birthPlace,
            puppiesOnBC[_puppyId].price
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
        transactionList.push(_transId);
    }
    
    function getTransactions() view public returns (address[]) {
       return (transactionList);
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
    
    // function countTransactions() view public returns (uint) {
    //     return transactionList.length;
    // }
    
    /*--------------------------------------------------------------------------
     * Define othere functions that will be used in the block chain.
     *--------------------------------------------------------------------------
     */
    function recharge(address _userId, uint256 _price) public {
        accountsOnBC[_userId].balance = accountsOnBC[_userId].balance + _price;
    }
    
    function checkOut(
        address _transId,
        address[] _puppiesIds,
        address _seller,
        address _buyer,
        uint256 _price
    ) 
        public
    {
        accountsOnBC[_buyer].balance = accountsOnBC[_buyer].balance - _price;
        accountsOnBC[_seller].balance = accountsOnBC[_seller].balance + _price;
        setTransaction(_transId, _puppiesIds, _seller, _buyer, _price);
    }
}