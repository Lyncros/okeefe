angular.module('starter.controllers')
    .controller('propertyRuralSheetController', function($scope,defaultFactory,entitiesService,$ionicSlideBoxDelegate) {
        $scope.list = defaultFactory.propertyRural_info;
        $scope.control = {};
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            group.show = !group.show;
            if(group.id == 3){
                entitiesService.refreshMap($scope);
            }
            if(group.id == 4){
                $ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
            }
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };
        $scope.trustSrc = function (src) {
            return entitiesService.trustSrc(src);
        };
    });
