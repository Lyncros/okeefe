(function () {
    angular.module('okeefeSite.services')
        .factory('okeefeApiService', function ($http, $q, API_OKEEFE) {
            var API = {};

            API.send = function (data) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: API_OKEEFE
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            return {
                API: API
            }
        });

})();