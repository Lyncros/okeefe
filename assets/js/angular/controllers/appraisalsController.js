(function () {
    angular.module('okeefeSite.controllers')
        .controller('appraisalsController', function ($scope, $rootScope, entitiesService, okeefeApiService) {
            $scope.video = false;
            $scope.appraisalForm = {
                secret: 'sitiOkeefe',
                dato: '',
                error: false,
                zona: '',
                oper: 'Venta',
                property: '',
                tipo: ''
            };
            $scope.showVideo = function () {
                $scope.video = true;
            };
            $scope.selectProperty = function (prop) {
                $scope.appraisalForm.tipo = prop;
                $scope.appraisalForm.property = entitiesService.getTipoInmueble(prop);
            };
            $scope.appForm = function ($event) {
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
                    entitiesService.showAlert($scope, 'Gracias por enviar.', 'success', 3000);
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
