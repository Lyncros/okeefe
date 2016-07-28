angular.module('starter.controllers')
    .controller('propertiesController', function($scope,defaultFactory,entitiesService) {
        $scope.map = defaultFactory.property_map;
        $scope.options = defaultFactory.options;
        $scope.control = {};
        $scope.refreshMap = function () {
            entitiesService.refreshMap($scope);
        };
        $scope.view = 'list';
    });
