(function () {
    angular.module('okeefeSite.controllers')
        .controller('propertySheetController',
            function ($scope, $rootScope, entitiesService, defaultFactory, $auth, $uibModal) {

            $scope.isLogged = $auth.isAuthenticated();

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
                entitiesService.moveArrow('property', key);
            };

            $scope.doFav = function () {
                if ($scope.isLogged) {

                } else {
                    var modal = $uibModal.open({
                        templateUrl: 'templates/modals/login.html',
                        controller: 'loginController',
                        size: 'lg',
                    });
                }
            };

            $scope.init();

        })
        .controller('ventureSheetController',
            function ($scope, $rootScope, entitiesService, defaultFactory, $auth, $uibModal) {

            $scope.isLogged = $auth.isAuthenticated();

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
                entitiesService.moveArrow('venture', key);
            };

            $scope.doFav = function () {
                if ($scope.isLogged) {

                } else {
                    var modal = $uibModal.open({
                        templateUrl: 'templates/modals/login.html',
                        controller: 'loginController',
                        size: 'lg',
                    });
                }
            };

            $scope.init();
        });
})();
