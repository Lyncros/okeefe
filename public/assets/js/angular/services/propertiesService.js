(function(){
    angular.module('okeefeSite.services')
        .factory('propertiesService', function($http,$q,entitiesService){

            var setURL = function (base,params) {
                return base;
            };

            var getFunction = function (params){
                var deferred = $q.defer();
                //var url = setURL(entitiesService.OkeefeApi.URL,null);
                /*$http.get(url)
                    .then(function successCallback(response) {
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response);
                    });*/
                // return deferred.promise;
                return params;
            };

            return{
                getFunction : getFunction,
            };
        });

})();