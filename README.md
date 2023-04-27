# eCommerceApplication
 DBMS term project to design and develop an e-commerce web application 





# **Project Name: eCommerce Application**

An online marketplace is a website or application that allows users to buy and sell goods and services from multiple vendors. The Online Marketplace project is a web application implemented in MERN stack. The application allows sellers to add, modify and delete items with their quantities. Customers can search for items, add them to their cart, modify the cart, and purchase them by selecting a bank and making a payment. Additionally, the application includes a feature for tracking item delivery, returning items, and providing advertisements and discounts by advertisers.


## **Table of Contents**



* [Features](#features)
* [ER Diagram](#er-diagram)
* [Relational Schema](#relational-schema))
* [Technologies Used](#technologies-used)
* [Installation and Setup](#installation-and-setup)



## **Features**

The following features have been implemented in the eCommerce Application:



* Sellers can add, modify, or delete item types and quantities.
* Customers can search for items, add them to their cart, and modify their cart.
* A dummy interface is available for customers to pay for items.
* A dummy bank has been implemented with customer accounts and an amount that can be modified.
* Exception handling is available when the amount balance is less.
* Customers and sellers can register an account in the platform.
* Each customer may have an account in 2 or 3 banks.
* Payment selection interface is available to choose banks.
* Sellers can view their dashboard to indicate items sold, items returned, and track each item.
* An inventory of different types of items of different quantities is available for each seller that changes dynamically as purchase happens.
* The application includes an advertisement interface for advertisers to add, modify, or delete discount coupons.
* Discounted amounts are withdrawn from the advertiser's bank account and credited to the seller.
* The platform has a bank account and enjoys a commission on each transaction.
* Relevant items and advertisers are shown to customers in the search interface for items.

The following features are under development:



* Item delivery tracking and return workflow.
* Randomly choosing the warehouse path for returning items.
* Item arrives at a warehouse and dispatches from a warehouse.
* Upon final arrival, OTP code should be entered by the customer in the web interface.
* Customer can track returned items and file grievances in the platform.
* If the seller accepts a return, the amount should be credited back to the customer.
* If the seller rejects a return, the customer can file a grievance in the platform.
* Specific details and history should be attached automatically.


## **ER Diagram**




## **Relational Schema**

The Relational Schema for the eCommerce Application is as follows:



## **Technologies Used**

The following technologies were used to implement the eCommerce Application:



* MongoDB
* Express.js
* React.js
* Node.js
* Mongoose

## **Installation and setup**

Ensure nodejs and mongodb are installed in the system.

* git clone the reporsitory
* Open two terminal with the parent directory
* ### In 1st terminal 
* * ``` cd backend ```
* * Then type ``` npm i ``` to install the dependencies
* * Then type ``` node server.js ``` to run the server
* ### In the 2nd terminal
* * ``` cd shoppingfrontend ```
* * ``` npm i ```
* * Then type ``` npm start ``` to start the react application

