(function(){
    angular.module('okeefeSite.controllers')
        .controller('propertySheetController',function ($scope,$rootScope, entitiesService,defaultFactory) {
            $scope.init = function () {
                entitiesService.wowSlider();
                entitiesService.popover();
                entitiesService.tabs();
                $scope.map = defaultFactory.property_map;
                $scope.control = {};
            };
            $scope.refreshMap = function () {
                entitiesService.refreshMap($scope);
            };
            $scope.moveArrow = function (key) {
                entitiesService.moveArrow('property',key);
            };

            $scope.init();
            
        })
        .controller('ventureSheetController',function ($scope,$rootScope, entitiesService, defaultFactory) {
            $scope.init = function () {
                entitiesService.popover();
                entitiesService.tabs();
                $scope.map = defaultFactory.property_map;
                $scope.control = {};
            };
            $scope.refreshMap = function () {
                entitiesService.refreshMap($scope);
            };
            $scope.moveArrow = function (key) {
                entitiesService.moveArrow('venture',key);
            };

            $scope.init();
        });
})();
