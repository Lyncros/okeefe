(function () {
    angular.module('okeefeSite.services')
        .factory('searchApiService', function ($http, $q, API_SEARCH, entitiesService) {
            var searchApi = {};
            var setURL = function (base, param, id) {
                var url = base;
                if (id) {
                    return url + 'propiedades/' + id;
                }
                url += 'propiedad?';
                angular.forEach(param, function (value, key) {
                    if (value)
                        url += key + (!entitiesService.hasDoubleEqual(key) ? '==' : '=') + value + '&';
                });
                url = url.substr(0, url.length - 1);
                //console.log("searchURL",url);
                return url;
            };
            searchApi.read = function (param) {
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: setURL(API_SEARCH, param)
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            searchApi.readLocations = function (param) {
                var url = API_SEARCH + 'propiedad?q='+param;
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: url
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            searchApi.readById = function (id) {
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: setURL(API_SEARCH, '', id)
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            return {
                searchApi: searchApi
            }
        });

})();