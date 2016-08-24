(function() {
    angular.module('starter.services')
        .factory("userService", function($http, API_CONF) {

            var vm = this;

            vm.userFactory = {};

            vm.userFactory.store = function(data) {
                return $http.post(API_CONF.host + 'register', data)
                    .then(function(response) {
                        return response;
                    });
            };

            vm.userFactory.update = function (data, id) {
                return $http.put(API_CONF.host + 'users/' + id, data)
                    .then(function(response) {
                        return response;
                    });
            };

            vm.userFactory.reset = function(data) {
                return $http.post(API_CONF.host + 'reset', data)
                    .then(function(response) {
                        return response;
                    });
            };

            vm.userFactory.me = function (data) {
                return $http.get(API_CONF.host + 'users/me', data)
                    .then(function(response) {
                        return response.data.cliente;
                    });
            };

            return vm.userFactory;

        });
})();
