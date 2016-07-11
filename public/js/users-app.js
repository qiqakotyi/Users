(function (angular, undefined) {
    'use strict';
    angular.module('users', ['ngRoute'])
        .config(function ($routeProvider, $locationProvider, AngularyticsProvider) {
            $routeProvider
                .when('#/', {
                    templateUrl: "views/users.html",
                    controller: 'UsersCtrl'
                })
                .when('/index', {
                    templateUrl: "views/users.html",
                    controller: 'UsersCtrl'
                })
        });
})(angular);
