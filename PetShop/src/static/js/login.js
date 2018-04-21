function onClickLogin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var url = "mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc";
  alert(url)

  var mongoose = require("mongoose")
  alert("1")

  //client = MongoClient('mongodb://dsc:dsc@ds119129.mlab.com:19129/dsc')

  var client = require("mongodb").MongoClient;
  alert("2")

  // Use connect method to connect to the server
  client.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.close();
  });

  //alert(mongodb)
  alert("2")


  if (username == "watman@gmail.com" && password == "pentakillwatman") {
    window.location = "index.html";
  } else {
    alert("Username and password does not match.")
  }
}
