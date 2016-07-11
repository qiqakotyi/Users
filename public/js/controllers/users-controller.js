(function (angular, undefined) {
    'use strict';
    angular.module('users').controller('UsersCtrl', function ($scope, $timeout,usersService) {


        //Functions
        //__________________________________________________________________________________________________________________


        //Events
        //__________________________________________________________________________________________________________________


        //Init
        //__________________________________________________________________________________________________________________
        usersService.getUsers().then(function (results) {
               $scope.users = results;
            })
            .catch(function (err) {
            });

    });
})(angular);
