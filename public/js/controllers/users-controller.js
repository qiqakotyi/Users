(function (angular, undefined) {
    'use strict';
    angular.module('users').controller('UsersCtrl', function ($scope, $timeout, $log, usersService) {

        $scope.pageSize = 10;
        $scope.currentPage = 1;

        //Functions
        //__________________________________________________________________________________________________________________
        $scope.select = function (user) {
            $scope.selected = user;
        };

        $scope.scrollTop = function () {
            $("html, body").animate({scrollTop: 0}, "slow");
            return false;
        }

        //Events
        //__________________________________________________________________________________________________________________


        //Init
        //__________________________________________________________________________________________________________________
        usersService.getUsers().then(function (results) {
                $scope.users = results;
                $scope.count = $scope.users.length;
            })
            .catch(function (err) {
                $log.debug(err);
            });


    }).directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    var item = angular.element('.item');

                    var firstItem = angular.element('.details');

                    $timeout(function () {
                        TweenMax.staggerTo(item, 0.3, {opacity: 1, marginTop: 0, ease: Power2.easeOut}, 0.1);
                    });
                    $timeout(function () {
                        TweenMax.staggerTo(firstItem, 0.9, {opacity: 1, marginTop: 0, ease: Power2.easeOut}, 0.1);
                    });
                }

            }
        }
    });
})(angular);
