(function () {
    angular.module('okeefeSite.services')
        .factory('searchApiService', function ($http, $q, API_SEARCH,API_JOB_APPLICATION, entitiesService) {
            var searchApi = {};
            var setURL = function (base, param, id) {
                var url = base;
                if (id) {
                    return url + 'propiedad/' + id;
                }
                url += 'propiedades/' + param.tipo + '/' + param.oper + '?';
                angular.forEach(param, function (value, key) {
                    if (key != 'tipo' && key != 'oper' && value && value != 'tipo' && value != 'oper')
                        url += key + (!entitiesService.hasDoubleEqual(key) ? '==' : '=') + value + '&';
                });
                url = url.substr(0, url.length - 1);
                //console.log("searchURL",url);
                return url;
            };
            searchApi.read = function (tipo, oper, ubicacion, param) {
                var deferred = $q.defer();
                param.tipo = entitiesService.getTipoInmueble(null, tipo);
                param.oper = entitiesService.getTipoOperacion(null, oper);
                param.ubicacion = ubicacion;
                $http({
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: setURL(API_SEARCH, param)
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            searchApi.readLocations = function (oper, t, q, emp) {
                oper = entitiesService.getTipoOperacion(null, oper);
                var url = API_SEARCH + 'ubicacion/' + q + '/' + t + '/' + oper + '?emp=' + emp;
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    skipAuthorization: true,
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
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: setURL(API_SEARCH, '', id)
                }).then(function successCallback(response) {
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            searchApi.readSuggested = function (id) {
                var deferred = $q.defer();
                $http({
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: API_SEARCH + 'sugeridos/' + id
                }).then(function successCallback(response) {
                    //console.log("sug",response);
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            searchApi.sendJobApplication = function (data) {
                var deferred = $q.defer();
                $http.post(API_JOB_APPLICATION,data,{
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function successCallback(response) {
                    //console.log("sug",response);
                    deferred.resolve(response);
                }, function errorCallback(response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };

            searchApi.Emprendimientos = function () {
                var deferred = $q.defer();
                $http({
                    skipAuthorization: true,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    url: API_SEARCH + 'emprendimientos'
                }).then(function successCallback(response) {
                    deferred.resolve(response.data);
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