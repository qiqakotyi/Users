(function (angular, undefined) {
    'use strict';
    angular.module('users').controller('UsersCtrl', function ($scope, $timeout, usersService) {


        //Functions
        //__________________________________________________________________________________________________________________
        $scope.select = function (user) {
            $scope.selected = user;
        };

        $scope.$on('$routeChangeSuccess', function () {
            // do something
        });

        //Events
        //__________________________________________________________________________________________________________________


        //Init
        //__________________________________________________________________________________________________________________
        usersService.getUsers().then(function (results) {
                $scope.users = results;
                $scope.count = $scope.users.length;
            })
            .catch(function (err) {
            });

    }).directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    var item = angular.element('.item');
                    $timeout(function () {
                        TweenMax.staggerTo(item, 0.3, {opacity: 1, marginTop: 0, ease: Power2.easeOut}, 0.1);
                    });
                }

            }
        }
    });
})(angular);
