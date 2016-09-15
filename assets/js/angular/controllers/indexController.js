(function () {
    angular.module('okeefeSite.controllers', [])
        .controller('indexController',
            function ($route, $scope, $rootScope, $window, $location, $uibModal, entitiesService, defaultFactory, $auth, userService, okeefeApiService, searchApiService) {

                $scope.maps = defaultFactory.footer_maps;
                $scope.alert = null;
                $scope.footerForm = {newsletter: 1, secret: 'sitiOkeefe', dato: '', error: false};
                $scope.$route = $route;
                $scope.resetForm = function () {
                    $scope.searchParam = {
                        empr: '',
                        zona: '',
                        oper: '12',
                        property: 'Residencial',
                        tipo: '9,1,7,17',
                        error: false
                    };
                };
                $scope.contactForm = function ($event) {
                    $event.preventDefault();
                    if (!$scope.footerForm.nombre || !$scope.footerForm.apellido || !$scope.footerForm.email || !$scope.footerForm.telefono || !$scope.footerForm.celular || !$scope.footerForm.comentarios) {
                        $scope.footerForm.error = true;
                        return false;
                    }
                    okeefeApiService.API.send($scope.footerForm).then(function (response) {
                        entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
                        $scope.footerForm = {newsletter: 1, secret: 'sitiOkeefe', dato: ''};
                    }, function errorCallback(response) {
                        entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
                        console.log("error :", response);
                    });
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
                    return searchApiService.searchApi.readLocations($scope.searchParam.oper,$scope.searchParam.tipo,val).then(function (response) {
                        return response.data.data.map(function (item) {
                            return {
                                val: item.idZona,
                                label : item.valor,
                                text: item.valor + " (" + item.cantidad + ")"
                            };
                        });
                    }, function errorCallback(response) {
                        console.log("error :", response);
                    });
                };
                entitiesService.mapsSlider($scope);
                $scope.searchProp = function () {
                    if ($scope.validateForm()) {
                        window.location = '#/propiedades/'+$scope.searchParam.tipo+'/'+$scope.searchParam.oper+'?ubicacion=' + $scope.searchParam.zona + '&emp=' + ($scope.searchParam.empr || 0);
                    }
                };
                $scope.selectedZone = function ($item, $model, $label) {
                    $scope.searchParam.zona = $item.val;
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


                $scope.scrollTo = function(id) {
                    $location.hash(id);
                }

                $scope.editAccount = function (tab) {
                    if ($scope.isLogged) {
                        var modal = $uibModal.open({
                            templateUrl: 'templates/modals/account.html',
                            controller: 'accountController',
                            size: 'xl',
                            resolve: {
                                tab: function () {
                                    return tab;
                                },
                            }});
                        modal.result
                            .then(function () {
                                // guardar
                            });
                        modal.result.catch(function () {
                            $window.location.reload();
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
