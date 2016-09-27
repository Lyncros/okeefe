(function () {
    angular.module('okeefeRuralSite.controllers')
        .controller('servicesRuralController', function ($scope, $rootScope, okeefeApiService, entitiesService) {
            $scope.servicesAdminForm = {
                secret: 'sitiOkeefe',
                dato: '',
                error: false
            };
            $scope.alert = null;
            $scope.adminRuralForm = function ($event) {
                $event.preventDefault();
                if (!$scope.servicesAdminForm.nombre || !$scope.servicesAdminForm.apellido || !$scope.servicesAdminForm.email || !$scope.servicesAdminForm.telefono || !$scope.servicesAdminForm.consulta) {
                    $scope.servicesAdminForm.error = true;
                    return false;
                }
                $scope.servicesAdminForm.comentarios = "<h3>Datos del Establecimiento</h3>";
                $scope.servicesAdminForm.comentarios += ($scope.servicesAdminForm.nombreest) ? "<h4><strong>Nombre: </strong>" + $scope.servicesAdminForm.nombreest + "</h4>" : "";
                $scope.servicesAdminForm.comentarios += ($scope.servicesAdminForm.localidad) ? "<h4><strong>localidad: </strong>" + $scope.servicesAdminForm.localidad + "</h4>" : "";
                $scope.servicesAdminForm.comentarios += ($scope.servicesAdminForm.partido) ? "<h4><strong>Partido: </strong>" + $scope.servicesAdminForm.partido + "</h4>" : "";
                $scope.servicesAdminForm.comentarios += ($scope.servicesAdminForm.superficie) ? "<h4><strong>Superficie: </strong>" + $scope.servicesAdminForm.superficie + "</h4>" : "";
                $scope.servicesAdminForm.comentarios += ($scope.servicesAdminForm.aptitud) ? "<h4><strong>Aptitud: </strong>" + $scope.servicesAdminForm.aptitud + "</h4>" : "";
                $scope.servicesAdminForm.comentarios += ($scope.servicesAdminForm.consulta) ? "<h4><strong>Consulta: </strong>" + $scope.servicesAdminForm.consulta + "</h4>" : "";
                okeefeApiService.API.send($scope.servicesAdminForm).then(function (response) {
                    entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
                    $scope.servicesAdminForm = {
                        secret: 'sitiOkeefe',
                        dato: '',
                        error: false
                    };
                }, function errorCallback(response) {
                    entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
                    console.log("error :", response);
                });
            };
        });
})();
