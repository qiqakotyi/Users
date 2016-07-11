(function (angular, undefined) {
    'use strict';
    angular.module('users').factory('usersService', ['$log', '$http', '$q', function ($log, $http, $q) {
        return {
            getUsers: function (result) {
                var dfd = $q.defer();
                $http.get('data.json')
                    .success(function (data, status) {
                        dfd.resolve(data);
                    })
                    .error(function (data, status) {
                        dfd.reject(data);
                    });
                return dfd.promise;
            }
        };
    }]);

})(angular);