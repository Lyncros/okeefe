(function () {
    angular.module('okeefeSite.controllers')
        .controller('accountController',
            function (favoritesService, $scope, $rootScope, $uibModalInstance, entitiesService, userService, okeefeApiService, tab, $window, SITE_URL) {
                $scope.siteUrl = SITE_URL;
                $scope.isLoading = false;
                $scope.alert;
                $scope.propertyName = 'valor_venta';
                $scope.orderChanged = 'valor_venta';
                $scope.activeTab = (tab || 'data');
                $scope.favForm = {
                    newsletter: 0,
                    secret: 'sitiOkeefe',
                    dato: '',
                    error: false
                };

                $scope.sortBy = function (propertyName) {
                    $scope.propertyName = propertyName;
                };

                $uibModalInstance.rendered.then(function () {
                    entitiesService.popover();
                });
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.sendFavForm = function ($event) {
                    $event.preventDefault();
                    if (!$scope.favForm.comentario) {
                        $scope.favForm.error = true;
                        return false;
                    }
                    let msg = '';
                    if ($scope.props.length) {
                        msg += 'Asesoramiento en propiedades con id ';
                        $scope.props.forEach(function (val) {
                            msg += val.id_prop + ', ';
                        });
                        msg += 'Mensaje: ' + $scope.favForm.comentario;
                    } else {
                        msg += 'Asesoramiento: ' + $scope.favForm.comentario;
                    }
                    if ($scope.favForm.newsletter) {
                        msg += ' - Adicionalmente desea que le sean enviadas propiedades similares a las mencionadas.'
                    }

                    $scope.favForm.comentarios = msg;

                    okeefeApiService.API.send($scope.favForm).then(function (response) {
                        entitiesService.showAlert($scope, 'Gracias por enviar.', 'success', 3000);
                        $scope.favForm = {
                            newsletter: 0,
                            secret: 'sitiOkeefe',
                            dato: '',
                            error: false
                        };
                        if($scope.props.length){
                            $scope.favForm.newsletter = 1;
                        }
                    }, function errorCallback(response) {
                        entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 4000);
                        console.log("error :", response);
                    });
                };

                userService.me()
                    .then(function (response) {
                        //console.log("user",response);
                        $scope.user = response;
                    });

                $scope.updateUser = function () {
                    $scope.isLoading = true;
                    userService.update($scope.user, $scope.user.id_cli)
                        .then(function (response) {
                            $scope.alert = {type: 'success', msg: response.data.message};
                            $scope.isLoading = false;
                        })
                        .catch(function (error) {
                            $scope.isLoading = false;
                            $scope.alert;
                        });
                };

                favoritesService.getAll()
                    .then(function (data) {
                        $scope.props = data;
                        if($scope.props.length){
                            $scope.favForm.newsletter = 1;
                        }
                        //console.log($scope.props);
                    });

                $scope.favDetails = function (id) {
                    $window.location = '/#!/ficha-propiedad/' + id;
                    $uibModalInstance.close('cancel');
                    return false;
                };
                $scope.favToggle = function (id) {
                    favoritesService.setFavorite(id)
                        .then(function () {
                            favoritesService.getAll()
                                .then(function (data) {
                                    $scope.props = data;
                                });
                        });
                }
            })
        .controller('loginController',
            function ($scope, $rootScope, $uibModalInstance, $location, entitiesService, $auth, $window) {

                $scope.alert;

                $scope.doLogin = function (email, password) {
                    $auth.login({
                        'email': email,
                        'password': password
                    })
                        .then(function (data) {
                            $scope.alert = {
                                type: 'success',
                                'msg': 'Bienvenido a Okeefe'
                            };

                            setTimeout(function () {
                                $uibModalInstance.close('cancel');
                                //$window.location.reload();
                            }, 1000);
                        })
                        .catch(function (error) {
                            $scope.alert = {
                                type: 'danger',
                                'msg': 'Credenciales invalidas'
                            };
                        });
                };

                $scope.authenticate = function (provider) {

                    $auth.authenticate(provider)
                        .then(function () {
                            $scope.alert = {
                                type: 'success',
                                'msg': 'Bienvenido a Okeefe'
                            };

                            $scope.alert = {
                                type: 'success',
                                'msg': 'Bienvenido a Okeefe'
                            };

                            setTimeout(function () {
                                $uibModalInstance.close('cancel');

                                $window.location.reload();
                            }, 1000);
                        })
                        .catch(function (error) {
                            if (error.error) {
                                // Popup error - invalid redirect_uri, pressed cancel button, etc.
                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error.error
                                };
                            } else if (error.data) {
                                // HTTP response error from server
                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error.data.message
                                };
                            } else {
                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error
                                };
                            }
                        });
                };

                $scope.rememberPw = function () {
                    $uibModalInstance.dismiss('cancel');
                    $location.path('recordar-clave');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.register = function () {
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.$emit('register');
                };

            })
        .controller('resetController',
            function ($scope, userService) {
                $scope.doReset = function (isValid) {

                    if (isValid) {
                        userService.reset($scope.user.email)
                            .then(function () {
                                $scope.alert = {
                                    type: 'success',
                                    'msg': 'Se reinicio su clave con exito, verifique su email.'
                                };

                                $scope.email = {};
                            })
                            .catch(function (error) {
                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error.data.message,
                                };
                            });
                    }
                }
            })
        .controller('registerController',
            function ($scope, $rootScope, $uibModalInstance, entitiesService, API_CLIENT_AUTH, $http, $auth, userService, $window) {
                $scope.discCheck = 1;

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
                $scope.login = function () {
                    $uibModalInstance.dismiss('cancel');
                    $rootScope.$emit('login');
                };

                $scope.doRegister = function (isValid) {

                    if (!$scope.discCheck) {
                        $scope.alert = {
                            type: 'danger',
                            'msg': 'Debe aceptar los terminos y condiciones para continuar'
                        };

                        return false;
                    }

                    if (isValid) {
                        userService.store($scope.user)
                            .then(function (response) {
                                $scope.alert = {
                                    type: 'success',
                                    'msg': 'Creado con exito, verifique su correo para obtener su clave.'
                                };

                                $scope.user = {};
                            })
                            .catch(function (error) {
                                if (error.data.status_code == 422) {
                                    $scope.alert = {
                                        type: 'danger',
                                        'msg': error.data.errors.clave[0],
                                    };
                                    return false;
                                }

                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error.data.error,
                                };
                            });
                    }
                };

                $scope.authenticate = function (provider) {

                    $auth.authenticate(provider)
                        .then(function () {
                            $scope.alert = {
                                type: 'success',
                                'msg': 'Bienvenido a Okeefe'
                            };

                            setTimeout(function () {
                                $uibModalInstance.dismiss('cancel');

                                $window.location.reload();
                            }, 1000);
                        })
                        .catch(function (error) {
                            if (error.error) {
                                // Popup error - invalid redirect_uri, pressed cancel button, etc.
                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error.error
                                };
                            } else if (error.data) {
                                // HTTP response error from server
                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error.data.message
                                };
                            } else {
                                $scope.alert = {
                                    type: 'danger',
                                    'msg': error
                                };
                            }
                        });
                };
            });
})();
