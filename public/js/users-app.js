(function (angular, undefined) {
    'use strict';
    angular.module('users', ['ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: "views/users.html",
                    controller: 'UsersCtrl'
                })
                .when('/index.html', {
                    templateUrl: "views/users.html",
                    controller: 'UsersCtrl'
                });
        });
})(angular);
