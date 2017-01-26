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
                    data: $.param(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
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

            API.convertCurrency = function (from, to) {
                var url = 'https://www.google.com/finance/info?q=CURRENCY:' + from + to;
                var deferred = $q.defer();
                var rate = sessionStorage.getItem(from + to);
                if(!rate){
                    $http({
                        method: 'GET',
                        skipAuthorization: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        url: url
                    }).then(function successCallback(response) {
                        var r = JSON.parse(response.data.slice(3, response.data.length))[0].l;
                        sessionStorage.setItem(from + to, r);
                        deferred.resolve(r);
                    }, function errorCallback(response) {
                        deferred.resolve(1);
                    });
                }else{
                    deferred.resolve(rate);
                }
                return deferred.promise;
            };

            return {
                API: API
            }
        });

})();