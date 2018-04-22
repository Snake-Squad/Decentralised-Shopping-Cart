pragma solidity ^0.4.2;

contract CheckOut {
    
    struct Transaction {
        string itemId;
        string seller;
        string buyer;
        uint price;
    }
    
    mapping (address => Transaction) transactions;
    address[] public transactionList;
    
    
    function setTransaction(address _transId, string _itemId, string _seller, 
    string _buyer,  uint _price) public { 
        var transaction = transactions[_transId];
       transaction.itemId = _itemId;
       transaction.seller = _seller;
       transaction.buyer = _buyer;
       transaction.price = _price;
       transactionList.push(_transId);
    }
    
    function getTransactions() view public returns (address[]) {
       return (transactionList);
    }
   
    function getTransaction(address _transId) view public returns (string, string, string, uint) {
        return (transactions[_transId].itemId, transactions[_transId].seller, 
        transactions[_transId].buyer, transactions[_transId].price);
    }
    
    function countTransactions() view public returns (uint) {
        return transactionList.length;
    }
}