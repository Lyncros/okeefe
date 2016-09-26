(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('servicesRuralController',function ($scope,$rootScope) {
            $scope.video = false;
            $scope.showVideo = function () {
                $scope.video = true;
            };
        });
})();
