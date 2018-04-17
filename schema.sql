--Create database--
create database bamazon;

use bamazon;

---create table for products---
create table products(
	item_id integer AUTO_INCREMENT not null,
	product_name VARCHAR (100) not null,
	department_name VARCHAR (50) not null,
	price Decimal (10,2) not null,
	stock_quantity integer (10) not null,
	primary key(item_id)
);

SELECT * FROM products; 

--Insert data into the 'products' table--

insert into products (product_name, department_name, price, stock_quantity)
values ("Wellness Dog Food", "Pet", 39.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Tide Pods", "Household", 18.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Colgate Total", "Personal Care", 10.52, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Tide Pods", "Household", 18.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Colgate Total", "Personal Care", 10.52, 10);

 insert into products (product_name, department_name, price, stock_quantity)
values ("Ms. Meyer Soap", "Household", 15.19, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Green Mountain Caramel Coffee", "Grocery", 13.33, 5);

insert into products (product_name, department_name, price, stock_quantity)
values ("Larabar-Coconut Cream", "Grocery", 3.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Canon Pixma Color Printer", "Office Electronics", 71.99, 8);

insert into products (product_name, department_name, price, stock_quantity)
values ("Back Brace", "Health *& Fitness", 23.99, 4);

insert into products (product_name, department_name, price, stock_quantity)
values ("iPhone X Case", "Electronics Accessories", 15.88, 7);

insert into products (product_name, department_name, price, stock_quantity)
values ("Whole30", "Cookbooks, Food & Wine", 32.99, 8);








