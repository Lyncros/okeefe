(function(){
    angular.module('okeefeSite.controllers')
        .controller('investmentsController',function ($scope,$rootScope, okeefeApiService, entitiesService) {
            $scope.form ={ secret: 'sitiOkeefe', dato: '', error: false};

            $scope.invForm = function ($event) {
                $event.preventDefault();
                if(!$scope.form.nombre || !$scope.form.apellido ||
                    !$scope.form.email || !$scope.form.telefono ||
                    !$scope.form.celular || !$scope.form.comentarios){
                    $scope.form.error = true;
                    return false;
                }
                $scope.form.comentarios = 'Asesoramiento: '+$scope.form.comentarios;
                okeefeApiService.API.send($scope.form).then(function (response) {
                    entitiesService.showAlert($scope,'Mensaje enviado. Estaremos en contacto en breve.','success',3000);
                    $scope.form ={ secret: 'sitiOkeefe', dato: ''};
                }, function errorCallback(response) {
                    entitiesService.showAlert($scope,'Error al enviar el mensaje. Intenta de nuevo mas tarde.','danger',3000);
                    console.log("error :", response);
                });
            };
            entitiesService.view_animation('.animation-element');
            entitiesService.project_filter();
            entitiesService.toggle('.detalle','.item',200);
        });
})();
