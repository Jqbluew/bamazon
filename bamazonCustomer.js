//Dependecies 
var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require("console.table");

//mySQL Connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	// User
	user: "root",

	//Need to change password
	password: "Antwil04",
	database:"bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

//Displays all products for sale in the store from mySQL bamazon database
var displayProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log(`
        Products Available for Sale in Bamazon Shop
        -------------------------------------------`);
        console.table(res);
    });
};

var start = function() {
    console.log('\n  ');
    inquirer.prompt({
        name: "purchaseOrExit",
        type: "rawlist",
        message: "Would you like to [PURCHASE] an item or [EXIT] the store?",
        choices: ["PURCHASE", "EXIT"]
    }).then(function(answer) {
        if (answer.purchaseOrExit.toUpperCase() === "PURCHASE") {
            makePurchase();
        } else {
            console.log(`
          Thank you for shopping with Bamazon.
          Come back and shop again soon!`);
            connection.end();
        }
    });
};

// Prompt user to enter item_id and stock_quantity they wish to purchase
var makePurchase = function() {
    console.log('\n  ');
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: " Enter the item_id of the product you want to purchase",

    }, {
        name: "quantity",
        type: "input",
        message: " Enter the stock_quantity you want to purchase",

    }]).then(function(answer) {
        // Query the bamazon database for info about the item including the quantity currently in stock. 
        connection.query('SELECT product_name, price, stock_quantity FROM products WHERE ?', { item_id: answer.id }, function(err, res) {

            console.log('\n  You would like to buy ' + answer.quantity + ' ' + res[0].product_name + ' at $' + res[0].price + ' each');
            if (res[0].stock_quantity >= answer.quantity) {
                //If enough stock_quantity to complete order, process order by updating database stock_quantity and notifying customer that order is complete. 
                var itemQuantity = res[0].stock_quantity - answer.quantity;
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: itemQuantity
                }, {
                    item_id: answer.id
                }], function(err, res) {});
                var cost = res[0].price * answer.quantity;
                console.log('\n  Order fulfilled! Your cost is $' + cost.toFixed(2) + '\n');
                // Order completed
                displayProducts();
                start();
                makePurchase();

            } else {
                //If not enough stock notify customer and prompt customer to keep shopping
                console.log('\n  Sorry, Insufficient stock_quantity to fulfill your order!\n');
                // Order not completed
                start();
            }
        })
    });
}

displayProducts();
start();


/*

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

		// Product and number of product items available for purchase. 		
  		availableProduct();
	})
}

//Prompt users with two messages.
var availableProduct = function(){
	inquirer.prompt([{
		name:"productID",
		type: "input",
		message: "Please enter item number for the product you would like to purchase.",
		validate: function(value) {
			if (isNaN(value)===false) {
				return true;
			}
			return false;
		}
	}, {
		name: "poductUnits",
		type: "input",
		message: "How many items would you like?",
		validate: function(value){
			if (isNaN(value)===false) {
				return true;
			}
			return false;
		}

	}]).then(function(answer){
		//Begin search for product
		var query = "Select stock_quantity, price, product_sales, department_name FROM products WHERE ?";
		connection.query(query, {item_id: answer.productID}, function(err, res){
			if (err) throw err;

			var available_stock = res[0].stock_quantity;
			var price_per_unit = res[0].price;
			var productSales = res[0].product_sales;
			var productDepartment = res[0].department_name;

			//check available inventory 
			if (available_stock >= answer.productUnits){

				completePurchase(available_stock, price_per_unit, productSales, productDepartment, answer.productID, answer.productUnits);
			} else {
				console.log("Unfortunately we are sold out.");
				//Buy product
				availableProduct();
			}

		})
	})
}

var completePurchase = function(availableStock, price, productSales, productDepartment, selectedProductID, selectedProductUnits) {

	var updatedStockQuanity = availableStock - selectedProductUnits;

	var totalPrice = price * selectedProductUnits;

	var updatedProductSales = parseInt(productSales) + parseInt(totalPrice);

	var query = "UPDATE products SET ? WHERE ?";

	connection.query(query, [{
		stock_quantity: updatedStockQuanity,
		productSales: updatedProductSales
	},{
		item_id: selectedProductID
	}], function(err, res) {
		if (err) throw err;
		console.log("Congratulations, your purchase is complete.");

		console.log("Your payment has been recieved: " + totalPrice);

		updateDepartmentRevenue(updatedProductSales, productDepartment);

	})
}

var updateDepartmentRevenue = function (updatedProductSales, productDepartment) {
	var query = "Select total_sales FROM departments WHERE ?";

	connection.query(query, {department_name: productDepartment}, function (err, res){
		if (err) throw err;

		var departmentSales = res[0].total_sales;

		var updateDepartmentSales = parseInt(departmentSales) + parseInt(updatedProductSales);
	})
}

var completeDepartmentSalesUpdate = function(updatedDepartmentSales, productDepartment) {
	 var query = "UPDATE departments SET ? WHERE ?";
	 connection.query(query, [{
	 	total_sales: updateDepartmentSales
	 }, {
	 	department_name: productDepartment
	 }], function(err, res){
	 	if (err) throw err;
	 	displayProducts();
	 })

}

*/
