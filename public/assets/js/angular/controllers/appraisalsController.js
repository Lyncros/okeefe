(function(){
    angular.module('okeefeSite.controllers')
        .controller('appraisalsController',function ($scope,$rootScope, propertiesService) {
            $scope.video = false;
            $scope.showVideo = function () {
                $scope.video = true;
            };
        });
})();
