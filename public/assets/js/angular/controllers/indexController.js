(function () {
    angular.module('okeefeSite.controllers', [])
        .controller('indexController',
            function ($scope, $rootScope, $uibModal, entitiesService, defaultFactory, $http, $auth, userService) {

            $scope.maps = defaultFactory.footer_maps;

            entitiesService.switchBox();
            entitiesService.tabs();
            entitiesService.mapsSlider($scope);

            $rootScope.$on('register', function (event, data) {
                $scope.register();
            });
            $rootScope.$on('login', function (event, data) {

                $scope.login();
            });

            $scope.isLogged = $auth.isAuthenticated();

            $scope.doLogout = function () {
                $auth.logout();

                window.location = '/';
            };

            userService.me()
                .then(function (response) {
                    $scope.user = response;
                });

            $scope.editAccount = function () {

                if ($scope.isLogged) {
                    var modal = $uibModal.open({
                        templateUrl: 'templates/modals/account.html',
                        controller: 'accountController',
                        size: 'xl',
                        resolve: {
                            //
                        }
                    });
                    modal.result
                        .then(function () {
                            // guardar
                        });
                    modal.result.catch(function () {
                    });
                } else {
                    $scope.login();
                }
            };
            $scope.register = function () {
                var modal = $uibModal.open({
                    templateUrl: 'templates/modals/register.html',
                    controller: 'registerController',
                    size: 'md',
                    resolve: {
                        //
                    }
                });
                modal.result.then(function () {
                    // guardar
                });
                modal.result.catch(function () {
                    //
                });
            };
            $scope.login = function () {
                var modal = $uibModal.open({
                    templateUrl: 'templates/modals/login.html',
                    controller: 'loginController',
                    size: 'lg',
                    resolve: {
                        //
                    }
                });
                modal.result.then(function () {
                    // guardar
                });
                modal.result.catch(function () {
                });
            };

        });
})();
