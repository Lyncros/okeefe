(function() {
    angular.module('okeefeSite.services',[])
        .factory('entitiesService', function () {
            return {
                OkeefeApi: {
                    URL: '/api/v1/propiedad'
                },
            };
        });
})();