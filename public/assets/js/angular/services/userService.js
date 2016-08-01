(function() {
    angular.module('okeefeSite.services')
        .factory("userService", function($http, API_CLIENT_AUTH) {

          var vm = this;

          vm.userFactory = {};

          vm.userFactory.store = function(data) {
            return $http.post(API_CLIENT_AUTH + 'register', data)
            .then(function(response) {
              return response;
            });
          };

         vm.userFactory.update = function (data, id) {
             return $http.put(API_CLIENT_AUTH + 'users/' + id, data)
                 .then(function(response) {
                     return response;
                 });
         };

          vm.userFactory.reset = function(data) {
            return $http.post(API_CLIENT_AUTH + 'reset', data)
              .then(function(response) {
                return response;
              });
          };

          vm.userFactory.me = function (data) {
              return $http.get(API_CLIENT_AUTH + 'users/me', data)
                  .then(function(response) {
                      return response.data.cliente;
                  });
          };

          return vm.userFactory;

        });
})();
