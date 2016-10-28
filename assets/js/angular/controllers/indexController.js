(function () {
    angular.module('okeefeSite.controllers', [])
        .controller('indexController',
            function ($route, $scope, $rootScope, $window, $filter, $location, $uibModal, entitiesService, defaultFactory, $auth, userService, okeefeApiService, searchApiService, searchApiRuralService) {
                $scope.maps = defaultFactory.footer_maps;
                $scope.alert = null;
                $scope.footerForm = {newsletter: 1, secret: 'sitiOkeefe', dato: '', error: false};
                $scope.$route = $route;
                $scope.bRural = false;

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
                $scope.selectedZone = function ($item, $model, $label) {
                    $scope.searchParam.zona = $item.val;
                    $scope.searchRuralParam.zona = $item.val;
                };
                entitiesService.mapsSlider($scope);
                $scope.resetRuralForm = function () {
                    $scope.searchRuralParam = {
                        zona: '',
                        oper: 'Compra',
                        property: 'Lotes',
                        tipo: '7',
                        error: false
                    };
                };
                $scope.resetRuralForm();
                $scope.validateRuralForm = function () {
                    if (!$scope.searchRuralParam.property || !$scope.searchRuralParam.oper || !$scope.searchRuralParam.zona) {
                        $scope.searchRuralParam.error = true;
                        return false;
                    }
                    return true;
                };
                $scope.getRuralLocation = function (val) {
                    return searchApiRuralService.searchApi.readLocations($scope.searchRuralParam.oper, $scope.searchRuralParam.tipo, val).then(function (response) {
                        console.log(response);
                        $scope.result = $filter('orderBy')(response.data.data, 'total', true);
                        return $scope.result.map(function (item) {
                            return {
                                val: item.id_ubica,
                                label: item.nombre_ubicacion,
                                text: item.nombre_ubicacion + " (" + item.total + ")"
                            };
                        });
                    }, function errorCallback(response) {
                        console.log("error :", response);
                        if($scope.result){
                            return $scope.result.map(function (item) {
                                return {
                                    val: item.id_ubica,
                                    label: item.nombre_ubicacion,
                                    text: item.nombre_ubicacion + " (" + item.total + ")"
                                };
                            });
                        }
                    });
                };

                $scope.searchRuralProp = function () {
                    if ($scope.validateRuralForm()) {
                        window.location = '#!/rural/propiedades/' + $scope.searchRuralParam.property + '/' + $scope.searchRuralParam.oper + '/' + $scope.searchRuralParam.zona + '?rural=true';
                    }
                };
                $scope.selectProperty = function (prop, rural) {
                    $scope.bRural = false;
                    if (rural) {
                        $scope.bRural = true;
                    }
                    $scope.searchParam.tipo = prop;
                    $scope.searchParam.property = entitiesService.getTipoInmueble(prop);
                    $scope.searchParam.zona = '';
                    $scope.loc = '';

                };
                $scope.selectRuralProperty = function (prop) {
                    $scope.searchRuralParam.tipo = entitiesService.getTipoInmueble(null, prop);
                    $scope.searchRuralParam.zona = '';
                    $scope.loc = '';
                };
                $scope.selectRuralOper = function () {
                    $scope.searchRuralParam.zona = '';
                    $scope.loc = '';

                };
                $scope.resetForm = function () {
                    $scope.searchParam = {
                        empr: '0',
                        zona: '',
                        oper: 'Compra',
                        property: 'Residencial',
                        tipo: '9,1,7,17',
                        error: false
                    };
                };
                $scope.resetForm();
                $scope.validateOper = function () {
                    $scope.searchParam.empr = 0;
                    $scope.searchParam.zona = '';
                    $scope.loc = '';
                    if ($scope.searchParam.oper == 'Venta')
                        window.location = '#!/tasaciones/';
                };
                $scope.validateForm = function () {
                    if (!$scope.searchParam.property || !$scope.searchParam.oper || !$scope.searchParam.zona) {
                        $scope.searchParam.error = true;
                        return false;
                    }
                    return true;
                };
                $scope.getLocation = function (val) {
                    if ($scope.bRural) {
                        return searchApiRuralService.searchApi.readLocations($scope.searchParam.oper, $scope.searchParam.tipo, val).then(function (response) {
                            $scope.result = $filter('orderBy')(response.data.data, 'total', true);
                            return $scope.result.map(function (item) {
                                return {
                                    val: item.id_ubica,
                                    label: item.nombre_ubicacion,
                                    text: item.nombre_ubicacion + " (" + item.total + ")"
                                };
                            });
                        }, function errorCallback(response) {
                            console.log("error :", response);
                        });
                    }
                    return searchApiService.searchApi.readLocations($scope.searchParam.oper, $scope.searchParam.tipo, val, $scope.searchParam.empr).then(function (response) {
                        $scope.result = $filter('orderBy')(response.data.data, 'total', true);
                        return $scope.result.map(function (item) {
                            return {
                                val: item.id_ubica,
                                label: item.nombre_ubicacion,
                                text: item.nombre_ubicacion + " (" + item.total + ")"
                            };
                        });
                    }, function errorCallback(response) {
                        if($scope.result){
                            return $scope.result.map(function (item) {
                                return {
                                    val: item.id_ubica,
                                    label: item.nombre_ubicacion,
                                    text: item.nombre_ubicacion + " (" + item.total + ")"
                                };
                            });
                        }
                        console.log("error :", response);
                    });
                };
                $scope.searchProp = function () {
                    if ($scope.bRural && $scope.validateForm()) {
                        window.location = '#!/rural/propiedades/' + $scope.searchParam.property + '/' + $scope.searchParam.oper + '/' + $scope.searchParam.zona + '?rural=true';
                    } else if ($scope.validateForm()) {
                        window.location = '#!/propiedades/' + $scope.searchParam.property + '/' + $scope.searchParam.oper + '/' + $scope.searchParam.zona + '?emp=' + ($scope.searchParam.empr || 0);
                    }
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


                $scope.scrollTo = function (id) {
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
                            }
                        });
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
