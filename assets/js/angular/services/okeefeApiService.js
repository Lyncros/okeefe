(function () {
    angular.module('okeefeSite.services')
        .factory('okeefeApiService', function ($http, $q, $window, API_OKEEFE, API_SEARCH) {
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

            API.getPDF = function (data) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    data: data,
                    responseType: 'arraybuffer',
                    url: API_SEARCH + 'propertypdf'
                }).then(function successCallback(response) {
                    var file = new Blob([response.data], {type: 'application/pdf'});
                    var url = $window.URL || $window.webkitURL;
                    var fileURL = url.createObjectURL(file);
                    deferred.resolve(fileURL);
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