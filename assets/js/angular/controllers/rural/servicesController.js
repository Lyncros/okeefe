(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('servicesController',function ($scope,$rootScope) {
            $scope.video = false;
            $scope.showVideo = function () {
                $scope.video = true;
            };
        });
})();
