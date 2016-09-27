(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('servicesRuralController',function ($scope,$rootScope) {
            $scope.adminRuralForm = function ($event) {
                $event.preventDefault();
                if (!$scope.appraisalForm.zona || !$scope.appraisalForm.nombre || !$scope.appraisalForm.apellido || !$scope.appraisalForm.email || !$scope.appraisalForm.telefono || !$scope.appraisalForm.celular) {
                    $scope.appraisalForm.error = true;
                    return false;
                }
                $scope.appraisalForm.comentarios = "<h3>Nueva consulta de tasación:</h3>" +
                    "<h4><strong>Operación: </strong>" + $scope.appraisalForm.oper + "</h4>" +
                    "<h4><strong>Tipo de propiedad: </strong>" + $scope.appraisalForm.property + "</h4>" +
                    "<h4><strong>Zona: </strong>" + $scope.appraisalForm.zona + "</h4>";
                okeefeApiService.API.send($scope.appraisalForm).then(function (response) {
                    entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
                    $scope.appraisalForm = {
                        secret: 'sitiOkeefe',
                        dato: '',
                        error: false,
                        zona: '',
                        oper: 'Compra',
                        property: '',
                        tipo: ''
                    };
                }, function errorCallback(response) {
                    entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
                    console.log("error :", response);
                });
            };
        });
})();
