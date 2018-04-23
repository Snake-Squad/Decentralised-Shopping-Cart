pragma solidity ^0.4.2;

contract CheckOut {
    
    struct Transaction {
        address[] itemIds;
        address seller;
        address buyer;
        uint price;
    }
    
    mapping (address => Transaction) transactions;
    address[] public transactionList;
    
    
    function setTransaction(address _transId, address[] _itemIds, 
    address _seller, address _buyer,  uint _price) public { 
        var transaction = transactions[_transId];
       transaction.itemIds = _itemIds;
       transaction.seller = _seller;
       transaction.buyer = _buyer;
       transaction.price = _price;
       transactionList.push(_transId);
    }
    
    function getTransactions() view public returns (address[]) {
       return (transactionList);
    }
   
    function getTransaction(address _transId) view public returns (address[], 
    address, address, uint) {
        return (transactions[_transId].itemIds, transactions[_transId].seller, 
        transactions[_transId].buyer, transactions[_transId].price);
    }
    
    function countTransactions() view public returns (uint) {
        return transactionList.length;
    }
}