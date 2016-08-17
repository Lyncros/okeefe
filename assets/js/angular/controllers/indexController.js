(function () {
    angular.module('okeefeSite.controllers', [])
        .controller('indexController',
            function ($route, $scope, $rootScope, $location, $uibModal, entitiesService, defaultFactory, $auth, userService, searchApiService) {

                $scope.maps = defaultFactory.footer_maps;
                $scope.alert = null;
                $scope.footerForm = {
                    newsletter: 1
                };
                $scope.$route = $route;
                $scope.resetForm = function () {
                    $scope.searchParam = {
                        empr: '',
                        zona: '',
                        oper: '12',
                        property: '',
                        tipo: '',
                        error: false
                    };
                };
                $scope.resetForm();
                $scope.validateEmp = function () {
                    $scope.searchParam.empr = 0;
                    if ($scope.searchParam.oper == 1)
                        $scope.searchParam.empr = 1;
                };

                $scope.validateForm = function () {
                    if (!$scope.searchParam.property || !$scope.searchParam.oper || !$scope.searchParam.zona) {
                        $scope.searchParam.error = true;
                        return false;
                    }
                    return true;
                };
                $scope.getLocation = function (val) {
                    return searchApiService.searchApi.readLocations(val).then(function (response) {
                        return response.data.data.map(function (item) {
                            var ans = {
                                val : item.valor,
                                text : item.valor + " (" + item.cantidad + ")"
                            };
                            return ans;
                        });
                    }, function errorCallback(response) {
                        console.log("error :", response);
                    });
                };
                entitiesService.mapsSlider($scope);
                $scope.searchProp = function () {
                    if ($scope.validateForm()) {
                        window.location = '#/propiedades?mostrar_props=true&operacion=' + $scope.searchParam.oper + '&tipo=' + $scope.searchParam.tipo + '&q=' + $scope.searchParam.zona + '&emp=' + ($scope.searchParam.empr || 0);
                    }
                };
                $scope.selectProperty = function (prop) {
                    $scope.searchParam.tipo = prop;
                    $scope.searchParam.property = entitiesService.tipoInmueble(prop);
                };
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
