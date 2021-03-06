/*
*
* Main App module with loading of angular components
* ***/
/**
 * @ng-route for routing //ng-cookies
 * temporariry hold user informations
 * */
var cartModule = angular.module('cartModule', ['ngRoute', 'LocalStorageModule']);

/**
 * load different pages for different pages
 * */
cartModule
    .config(function ($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $routeProvider.when("/", {
            templateUrl: "partialViews/mainPage.html"
        });
        $routeProvider.otherwise({
            templateUrl: "partialViews/mainPage.html"
        })
    });

cartModule.constant('serverURL', 'http://192.168.0.40:8081/Cart/CartApi/Api_Rest/');
/**
 * declare controller to handle application log
 * */
cartModule.controller('cartController', function ($scope, $rootScope, $http, localStorageService) {


    /***
     * backend end point for the shopping cart
     * */

    var serverURL = BASE_URL;
    /**
     * $scope.data to hold model data for the application
     */
    $scope.data = {};
    /**
     * $scope.data.products to be added to the cart
     */
    $scope.data.products = {};
    /**
     * $scope.data.getProducts  method to make http request
     */
    $scope.data.getProducts = function () {
        try {
            var url = serverURL + 'getProducts';
            $http
                .post(url)
                .success(function (data) {
                    if (data.status == 1) {
                        $scope.data.products = data.data;
                    } else {

                    }
                })
                .error(function (e) {
                    console.log(e)
                })

        } catch (e) {
            console.log(e)
        }


    }
    /***
     * check if its the first item on the list,then change the border class
     * */
    $scope.data.returnClassBorder = function (index) {
        if (index > 0) {
            return 'borderBottom';
        } else {
            return false;
        }
    };

    /**
     * Items added to cart object
     * */
    $scope.data.cart = [];
    /**
     * Total amount in the cart
     * */
    $scope.data.cartTotal = 0;
    /**bottles in the cart*/
    $scope.data.cartBottles = 0;

    /**
     * add items to cart
     * check the logic before an item is added ,
     * example if an item already added,change the total and the qty
     * change bottles quantity
     * */
    function pushToCartArray(tempArray) {
        try {
            $scope.data.cartTotal = 0;
            $scope.data.cartBottles = 0;
            if ($scope.data.cart.length > 0) {
                var existing = false;
                if (angular.isDefined(tempArray)) {
                    for (var i = 0; i < $scope.data.cart.length; i++) {
                        if ($scope.data.cart[i]['id'] == tempArray['id'] && $scope.data.cart[i]['type'] == tempArray['type']) {

                            $scope.data.cart[i]['qty'] += Number(tempArray['qty']);
                            $scope.data.cart[i]['total'] += Number(tempArray['total']);

                            showNotification( tempArray['productName'] +" has been updated to "+$scope.data.cart[i]['qty'] +" "+tempArray['type']+"s",$scope.data.cart[i]);
                            existing = true;
                            break;
                        }
                    }
                    if (!existing) {
                        showNotification(tempArray['productName']+" has been added , "+tempArray['qty'] +"bottle(s)",tempArray);
                        $scope.data.cart.push(tempArray);
                    }
                }
            } else {
                $scope.data.cart.push(tempArray);
            }
            if ($scope.data.cart.length > 0) {
                for (var i = 0; i < $scope.data.cart.length; i++) {
                    console.log($scope.data.cart[i]['total']);
                    $scope.data.cartTotal += Math.round($scope.data.cart[i]['total']);
                    $scope.data.cartBottles += Math.round($scope.data.cart[i]['qty']);

                }
            } else {
                $scope.data.cartTotal = 0;
                $scope.data.cartBottles = 0;
            }
            var object = {
                cartTotal: $scope.data.cartTotal,
                cartBottles: $scope.data.cartBottles,
                cart: $scope.data.cart
            };

            localStorageService.set('cart', object);

        } catch (e) {
            console.log(e)
        }
    }


    /***
     *On Url change regenerate our cart with cached data
     * **/

    $rootScope.$on('$routeChangeSuccess', function () {

        var cart = localStorageService.get('cart');

        if (cart) {
            $scope.data.cartTotal = cart.cartTotal;
            $scope.data.cartBottles = cart.cartBottles;
            $scope.data.cart = cart.cart;
        }

    });

    /***
     * Clear everything from the cart
     * */
    $scope.data.emptyCart = function () {
        $scope.data.cartTotal = 0;
        $scope.data.cartBottles = 0;
        $scope.data.cart = [];
        showNotification("Cart has been cleared");
        localStorageService.set('cart', null);
    }
    /***
     * Remove item from the cart and update the relative
     * related objects
     * */
    $scope.data.removeItem = function (index) {
        try {
            var removed = false;
            if (angular.isNumber(index)) {
                for (var i = 0; i < $scope.data.cart.length; i++) {

                    if (i == index) {
                        $scope.data.cart.splice(i, 1);
                        removed = true;
                        break;
                    }

                }
            }
            if (removed){

                if ($scope.data.cart.length > 0) {
                    pushToCartArray();
                } else {
                    $scope.data.cart = [];
                    $scope.data.cartBottles = 0;
                    $scope.data.cartTotal = 0;
                }
            }

        } catch (e) {
            console.log(e)
        }

    }

    /***
     * Show notifications
     * */
    function showNotification(msg,item){

        $.extend($.gritter.options, {
            position: 'top-right', //
            fade_in_speed: 'medium', //
            fade_out_speed: 2000, //
            time: 4000 //
        });
        $.gritter.add({
            title: msg,


            class_name: 'gritter-dark'

        });
    }

    /***
     *adding items to the shopping cart from the UI
     * */
    $scope.data.addToCart = function (product) {



        try {
            if (angular.isDefined(product)) {

                var tempArray = {};
                var tempArrayBottle = {};
                var tryPush = false;
                if (product.itemCaseQty > 0) {
                    tempArray['type'] = 'case';
                    tempArray['id'] = product.id;
                    tempArray['qty'] = product.itemCaseQty * 12;
                    tempArray['price'] = product.casePrice;
                    tempArray['productName'] = product.productName;
                    tempArray['total'] = Math.round(Number(product.casePrice * product.itemCaseQty));
                    console.log(tempArray)
                    pushToCartArray(tempArray);
                    tryPush = true;
                }
                if (product.itemPieceQty > 0) {
                    tryPush = false;
                    tempArrayBottle['type'] = 'Bottle';
                    tempArrayBottle['qty'] = Number(product.itemPieceQty);
                    tempArrayBottle['price'] = product.price;

                    tempArrayBottle['id'] = product.id;
                    tempArrayBottle['productName'] = product.productName;
                    tempArrayBottle['total'] = Math.round(Number(product.price * product.itemPieceQty));
                    console.log(tempArrayBottle)
                    pushToCartArray(tempArrayBottle);
                    tryPush = true;
                }
                if (tryPush) {

                }

            }
        } catch (e) {
            showNotification("An error occured,please try adding again");
            console.log(e);
        }

    }
    /***
     *Customer  details objects
     * */
    $scope.data.customer = {};
    $scope.data.showStatus = false;
    $scope.data.responseMessage = false;
    $scope.data.changeCustomerDet = function (div) {
        if (div == 'customer') {
            $scope.data.showStatus = false;
        }
        $scope.data.customerDet = div;

    }
    /**
     *Filter out the club by the supplied value
     * */

    $scope.data.filter = ''
    $scope.data.filterWines = function (filt) {
        $scope.data.filter = filt;
    }

    /**
     *Default order by productname
     * */
    $scope.data.sort = 'productName';
    /**
     *Sort the club depending on the click button
     * */
    $scope.data.orderBy = function (column) {
        $scope.data.sort = column;
        $scope.data.filter = '';
    }

    /**
     *Show more detail for the details button
     * */
    $scope.data.clickedWine = {};
    $scope.data.generateClickedWine = function (wine) {
        $scope.data.clickedWine = wine;
    }

    /***
     *Checkout the customer,save details and show the order number
     * */
    $scope.data.customerCheckOut = function (customerData) {
        try {
            var cData = {};

            cData.customerDetails = customerData;
            cData.cart = $scope.data.cart;
            console.log(cData.cart);
            if (angular.isDefined(customerData)) {
                $scope.data.responseMessage = 'Saving,please wait';
                $scope.data.showStatus = true;
                $scope.data.divColor = 'alert-info';
                var url = serverURL + 'saveOrder';
                $http
                    .post(url, cData)
                    .success(function (data) {

                        $scope.data.responseMessage = data.message;
                        $scope.data.showStatus = true;
                        if (data.status == 1) {
                            $scope.data.customer = {};
                            $scope.data.emptyCart();
                            localStorageService.set('cart', null);
                            $scope.data.divColor = 'alert-success';
                        } else {
                            $scope.data.divColor = 'alert-danger';
                        }
                    })
                    .error(function (error) {
                        alert(error)
                        $scope.data.responseMessage = 'Server Error,please try again';
                        $scope.data.showStatus = true;
                        $scope.data.divColor = 'alert-danger';
                    })
            } else {
                $scope.data.responseMessage = 'Error occured,Please try again';
                $scope.data.showStatus = true;
                $scope.data.divColor = 'alert-danger';
            }
        } catch (e) {

        }
    }
    /***
     * change the add to cart label on the button once a user clicks the button to added
     * */
    $scope.data.returnIfAdded = function (id) {

        if ($scope.data.cart.length > 0) {
            for (var i = 0; i < $scope.data.cart.length; i++) {
                if ($scope.data.cart[i]['id'] == id) {

                    return true;

                }
            }
        }
        return false;
    }


});



