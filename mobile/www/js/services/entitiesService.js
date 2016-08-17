(function() {
    angular.module('starter.services',[])
        .service('entitiesService', function ($timeout,$sce) {
            this.refreshMap = function ($scope) {
                $timeout(function() {
                    $scope.control.refresh();
                }, 400);
            };
            this.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }
        });
})();