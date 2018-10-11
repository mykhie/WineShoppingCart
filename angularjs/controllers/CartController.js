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
cartModule.constant('serverURL', 'http://localhost:8081/CartApi/index.php/api/');
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
});



