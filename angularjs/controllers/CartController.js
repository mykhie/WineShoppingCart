/*
*
* Main App module with loading of angular components
* ***/
/**
 * @ng-route for routing //ng-cookies
 * temporariry hold user informations
 * */
var cartModule = angular.module('cartModule', ['ngRoute', 'ngCookies']);

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
/*
* backend end point for the shopping cart
* */
cartModule.constant('serverURL', 'http://localhost:8081/WineShoppingCart/CartApi/index.php/Api_Rest/');
/**
 * declare controller to handle application log
 * */
cartModule.controller('cartController', function ($scope, $rootScope, $http, serverURL) {

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
                            existing = true;
                            break;
                        }
                    }
                    if (!existing) {
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
        } catch (e) {
            console.log(e)
        }
    }

    /***
     * Clear everything from the cart
     * */
    $scope.data.emptyCart = function () {
        $scope.data.cartTotal = 0;
        $scope.data.cartBottles = 0;
        $scope.data.cart = [];
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
            if (removed) {
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
    $scope.data.filter = ''
    $scope.data.filterWines = function (filt) {
        $scope.data.filter = filt;
    }
    $scope.data.sort = 'productName';
    $scope.data.orderBy = function (column) {
        $scope.data.sort = column;
        $scope.data.filter = '';
    }

    /**
     *
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
                        alert(data);
                        $scope.data.responseMessage = data.message;
                        $scope.data.showStatus = true;
                        if (data.status == 1) {
                            $scope.data.customer = {};
                            $scope.data.emptyCart();
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


});



