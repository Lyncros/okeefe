(function () {
    angular.module('okeefeSite.controllers')
        .controller('propertiesController',
            function ($scope, $rootScope, $uibModal, entitiesService, defaultFactory, $auth) {

            $scope.isLogged = $auth.isAuthenticated();

            $scope.view = "grid";

            $scope.changeView = function (view) {
                $scope.view = view;
            };

            $scope.map = defaultFactory.property_map;
            $scope.control = {};

            $scope.refreshMap = function () {
                entitiesService.refreshMap($scope);
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

            $scope.editFav = function () {
                var modal = $uibModal.open({
                    templateUrl: 'templates/modals/fav.html',
                    controller: 'accountController',
                    size: 'xl',
                    resolve: {
                        //
                    }
                });
                modal.result.then(function () {
                    // guardar
                });
                modal.result.catch(function () {
                });
            };

            entitiesService.banner();
        });
})();
