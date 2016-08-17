angular.module('starter.controllers')
    .controller('accountController', function ($scope, $auth, userService, $ionicPopup) {

        userService.me()
            .then(function (response) {
                $scope.user = response;
            });

        $scope.updateUser = function () {

            userService.update($scope.user, $scope.user.id_cli)
                .then(function (response) {
                    $ionicPopup.alert({
                        title: 'Exito',
                        content: 'Datos actualizados con exito.'
                    }).catch(function (response) {
                        $ionicPopup.alert({
                            title: 'Error',
                            content: response.data.error
                        });
                    });
                });
        }
    });

