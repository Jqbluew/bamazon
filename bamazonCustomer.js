var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Antwil04",
	database:"bamazon"

});

connection.connect (function (err) {
	if (err) throw err;
  // Displays list of available products.
  displayProducts();

});

// Displays list of all available products.
var displayProducts = function (){
	var query = "Select * FROM products";
	connection.query(query, function(err, res) {

		if (err) throw err;

		for (var i = 0; i < res.length; i++) {
			console.log("Product ID: " + res[i].item_id + " || Product Name: " +
						res[i].product_name + " || Price: " + res[i].price);
		}

		// Requests product and number of product items user wishes to purchase.
  		//requestProduct();
	})
}
