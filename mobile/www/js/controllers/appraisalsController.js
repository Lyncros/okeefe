angular.module('starter.controllers')
    .controller('appraisalsController', function($scope,$ionicModal,entitiesService, okeefeApiService) {
      $scope.appraisalForm = {
        secret: 'sitiOkeefe',
        dato: '',
        zona: '',
        oper: 'Venta',
        property: '',
        tipo: ''
      };
      $scope.appForm = function () {
        $scope.appraisalForm.comentarios = "<h3>Nueva consulta de tasación:</h3>" +
          "<h4><strong>Operación: </strong>" + $scope.appraisalForm.oper + "</h4>" +
          "<h4><strong>Tipo de propiedad: </strong>" + $scope.appraisalForm.property + "</h4>" +
          "<h4><strong>Zona: </strong>" + $scope.appraisalForm.zona + "</h4>";
        okeefeApiService.API.send($scope.appraisalForm).then(function (response) {
          entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
          $scope.appraisalForm = {
            secret: 'sitiOkeefe',
            dato: '',
            zona: '',
            oper: 'Venta',
            property: '',
            tipo: ''
          };
        }, function errorCallback(response) {
          entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
          console.log("error :", response);
        });
      };
      $ionicModal.fromTemplateUrl('templates/modal/selectPropertyModal.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.propertyModal = modal;
      });
      $ionicModal.fromTemplateUrl('templates/modal/appr-oper-select.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.operationModal = modal;
      });
      $scope.selectOperation = function (u) {
        $scope.appraisalForm.oper = u;
        $scope.operationModal.hide();
      };
      $scope.selectProperty = function (prop) {
        $scope.appraisalForm.property = entitiesService.getTipoInmueble(prop);
        $scope.propertyModal.hide();
      };
    })


