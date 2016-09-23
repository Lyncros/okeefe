(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('workWithUsController', function ($scope, $rootScope, searchApiService, entitiesService) {
            $scope.CAPTCHA = "6LeUIgcUAAAAAL53E8sjRRhH3AoPfD-KMrdMWgSy";
            $scope.workForm = {secret: 'sitiOkeefe', dato: '', error: false};
            $scope.submitWorkForm = function ($event) {
                $event.preventDefault();
                if (!$scope.workForm.nombre || !$scope.workForm.apellido || !$scope.workForm.email || !$scope.workForm.captcha) {
                    $scope.workForm.error = true;
                    return false;
                }
                var fd = new FormData();
                fd.append('file', $scope.workForm.file);
                fd.append('nombre', $scope.workForm.nombre);
                fd.append('apellido', $scope.workForm.apellido);
                fd.append('email', $scope.workForm.email);
                fd.append('telefono', ($scope.workForm.telefono || ''));
                fd.append('fecha_nacimiento', ($scope.workForm.fecha_nacimiento || ''));
                fd.append('comentarios', ($scope.workForm.comentarios || ''));
                searchApiService.searchApi.sendJobApplication(fd).then(function (response) {
                    entitiesService.showAlert($scope, 'Gracias por tu interés. Estaremos en contacto en breve.', 'success', 3000);
                    //$scope.workForm = {secret: 'sitiOkeefe', dato: '', error: false};
                }, function errorCallback(response) {
                    entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
                    console.log("error :", response);
                });

            };
        });
})();
