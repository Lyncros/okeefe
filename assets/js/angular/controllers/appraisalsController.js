(function(){
    angular.module('okeefeSite.controllers')
        .controller('appraisalsController',function ($scope,$rootScope) {
            $scope.video = false;
            $scope.showVideo = function () {
                $scope.video = true;
            };
        });
})();
