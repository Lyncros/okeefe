angular.module('starter.controllers')
  .controller('investmentsController', function ($scope, defaultFactory, okeefeApiService, entitiesService) {
    $scope.investments_timing = defaultFactory.investments_timing;
    $scope.form = {secret: 'sitiOkeefe', dato: ''};
    $scope.invForm = function () {
      $scope.form.comentarios = 'Asesoramiento: ' + $scope.form.comentarios;
      okeefeApiService.API.send($scope.form).then(function (response) {
        entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
        $scope.form = {secret: 'sitiOkeefe', dato: ''};
      }, function errorCallback(response) {
        entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
        console.log("error :", response);
      });
    };
  });
