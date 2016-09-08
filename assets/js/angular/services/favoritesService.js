(function() {
    angular.module('okeefeSite.services')
        .factory("favoritesService", function($http, API_CLIENT_AUTH) {

            var vm = this;

            vm.favoriteFactory = {};

            vm.favoriteFactory.getAll = function () {
              return $http.get(API_CLIENT_AUTH + 'propiedades/favoritos/')
                  .then(function (response) {
                      return response.data;
                  });
            };

            vm.favoriteFactory.count = function() {
                return $http.get(API_CLIENT_AUTH + 'propiedades/favoritos/count').then(function (response) {
                    return response.data;
                });
            };

            vm.favoriteFactory.setFavorite = function(id) {
                return $http.post(API_CLIENT_AUTH + 'propiedades/'+ id +'/favoritos')
                    .then(function(response) {
                        return response.data;
                    })
            };

            return vm.favoriteFactory;
        });
})();

