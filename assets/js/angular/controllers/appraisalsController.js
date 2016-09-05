(function(){
    angular.module('okeefeSite.controllers')
        .controller('appraisalsController',function ($scope, $rootScope, entitiesService) {
            $scope.video = false;
            $scope.appraisalForm = {secret: 'sitiOkeefe', dato: '', error: false, zona: '', oper: '12', property: '', tipo: ''};
            $scope.showVideo = function () {
                $scope.video = true;
            };
            $scope.selectProperty = function (prop) {
                $scope.appraisalForm.tipo = prop;
                $scope.appraisalForm.property = entitiesService.tipoInmueble(prop);
            };
        });
})();
