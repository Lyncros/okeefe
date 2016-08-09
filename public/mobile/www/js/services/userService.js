(function() {
    angular.module('starter.services')
        .factory("userService", function($http) {

            var vm = this;

            vm.userFactory = {};

            vm.userFactory.store = function(data) {
                return $http.post('http://localhost:8000/api/' + 'register', data)
                    .then(function(response) {
                        return response;
                    });
            };

            vm.userFactory.update = function (data, id) {
                return $http.put('http://localhost:8000/api/' + 'users/' + id, data)
                    .then(function(response) {
                        return response;
                    });
            };

            vm.userFactory.reset = function(data) {
                return $http.post('http://localhost:8000/api/' + 'reset', data)
                    .then(function(response) {
                        return response;
                    });
            };

            vm.userFactory.me = function (data) {
                return $http.get('http://localhost:8000/api/' + 'users/me', data)
                    .then(function(response) {
                        return response.data.cliente;
                    });
            };

            return vm.userFactory;

        });
})();
