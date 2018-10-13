# Wine Shopping Cart
Wine shopping cart is a basic application created with angularjs -1.4 and Codeigniter Php Framework and mysql database.
It allows users to to quickly add items to there shopping cart and checkout with their details

## Installation.
Please follow the below step to run to install

#### Languages
  - Codeigniter  (php framework)
  - Angularjs
  - Sql(MySql)
  - Bootstrap 3.3

#### Prerequisites
  - php 5.6
  - mysql
  - xampp/lampp/wamp

#### Steps

  - Download the project or clone by run the below command
      ```sh
    $ git clone https://github.com/mykhie/WineShoppingCart.git
    ```
    >copy/transfer the folder to your favourite web server (for this case i used xampp),so copy it to xampp/htdocs/
 - **Configuring the API**
 inside the copies folder open CartApi/application/settings/database.json and change the database setting to match with your database configurations
      ```sh
    {
          "hostname":"localhost",
          "username":"root", //database username
          "password":"", //your database password
          "database":"interviewcart",//your catr database
          "encryption":"false"
        }
    ```
    Now,inside the porject folder open database/cart.sql and run the script against your mysql database.
    >that should create the database with 3 basic tables for out cart
    
    **Thats all for the api**
 - **The Front End**
 Nothing much id done here,Incase no products are fetched,please check inside angularjs/config/config.js to check if its returning the right url.The assumption is,the api and the front end will reside inside the same folder,In a scenario this is no the case the base url can be changed from the config.json file
- You can know access the shopping cart via 
     ```sh
    127.0.0.1:[port]/cart
    ```

    
    
    
