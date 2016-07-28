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
          }

          vm.userFactory.reset = function(data) {
            return $http.post(API_CLIENT_AUTH + 'reset', data)
              .then(function(response) {
                return response;
              });
          }


          return vm.userFactory;

        });
})();
