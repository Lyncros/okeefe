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
  .controller('contactController', function ($scope, $auth, defaultFactory, entitiesService, okeefeApiService, userService) {
    $scope.maps = defaultFactory.footer_maps;
    $scope.footerForm = {newsletter: true, secret: 'sitiOkeefe', dato: ''};
    userService.me()
      .then(function (response) {
        $scope.user = response;
        userFormData()
      });
    function userFormData() {
      $scope.footerForm.nombre = $scope.user.nombre;
      $scope.footerForm.apellido = $scope.user.apellido;
      $scope.footerForm.email = $scope.user.email;
      $scope.footerForm.telefono = $scope.user.telefono;
      $scope.footerForm.celular = $scope.user.celular;
    }

    $scope.contactForm = function () {
      $scope.footerForm.newsletter = ($scope.footerForm.newsletter) ? 1 : 0;
      okeefeApiService.API.send($scope.footerForm).then(function (response) {
        entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
        $scope.footerForm = {newsletter: true, secret: 'sitiOkeefe', dato: ''};
        userFormData();
      }, function errorCallback(response) {
        entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
        $scope.footerForm = {newsletter: true, secret: 'sitiOkeefe', dato: ''};
        userFormData();
        console.log("error :", response);
      });
    };
  })
  .controller('userAccController', function ($scope, $auth) {
    $scope.go = function (data) {
      window.location = data;
    };
  })
;

