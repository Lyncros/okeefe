angular.module('starter.controllers')
    .controller('userController', function ($scope, $ionicPopup, $auth, userService) {

        $scope.user = {};

        $scope.doLogin = function () {
            $auth.login({
                    'email': $scope.user.email,
                    'password': $scope.user.password
                })
                .then(function () {
                    $ionicPopup.alert({
                            title: 'Exito',
                            content: 'Iniciada la sesión con exito'
                        })
                        .then(function (res) {
                            window.location = '#/app/inicio'
                        });
                })
                .catch(function (response) {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: response.data.error
                    })
                });
        };

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function () {
                    $ionicPopup.alert({
                            title: 'Exito',
                            content: 'Iniciada la sesión con exito'
                        })
                        .then(function (res) {
                            window.location = '#/app/inicio'
                        });
                })
                .catch(function (response) {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: response.data ? response.data || response.data.message : response
                    })
                });
        };

        $scope.doLogout = function () {
            $auth.logout();
        }

        $scope.doRegister = function () {

            userService.store($scope.user)
                .then(function (response) {
                    $ionicPopup.alert({
                            title: 'Exito',
                            content: 'Usuario creado con exito'
                        })
                        .then(function (res) {
                            window.location = '#/app/login'
                        });

                    $scope.user = {};
                })
                .catch(function (error) {
                    if (error.data.status_code == 422) {

                        $ionicPopup.alert({
                            title: 'Error',
                            content: error.data.errors.clave[0],
                        });

                        return false;
                    }

                    $ionicPopup.alert({
                        title: 'Error',
                        content: error.data.error
                    });
                });
        }

    });

