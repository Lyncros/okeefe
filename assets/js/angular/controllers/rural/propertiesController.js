(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('propertiesController',function ($scope,$rootScope,entitiesService,defaultFactory) {
            $scope.view = "grid";
            $scope.changeView = function (view) {
                $scope.view = view;
            };
            $scope.map = defaultFactory.property_map;
            $scope.control = {};
            $scope.refreshMap = function () {
                entitiesService.refreshMap($scope);
            };
        });
})();
