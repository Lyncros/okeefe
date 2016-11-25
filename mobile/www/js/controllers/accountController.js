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
    })
  .controller('favController', function ($scope, $auth, favoritesService) {
    favoritesService.getAll()
      .then(function (data) {
        //console.log("fav",data);
        $scope.props = data;
      });

    $scope.favDetails = function (id) {
      window.location = '/#!/ficha-propiedad/' + id;
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
  .controller('contactController', function ($scope, $auth, defaultFactory) {
    $scope.maps = defaultFactory.footer_maps;
  })
  .controller('userAccController', function ($scope, $auth) {
    $scope.go = function (data) {
      window.location = data;
    };
  })
;

