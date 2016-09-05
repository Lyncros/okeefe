(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('accountController',function ($scope,$rootScope,$uibModalInstance,entitiesService) {
            $uibModalInstance.rendered.then(function(){
                entitiesService.switchBox();
                entitiesService.popover();
            });
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
        .controller('loginController',function ($scope,$rootScope,$uibModalInstance,$location,entitiesService) {
            $uibModalInstance.rendered.then(function(){
                entitiesService.switchBox();
            });

            $scope.rememberPw = function () {
                $uibModalInstance.dismiss('cancel');
                $location.path('recordar-clave');
            }
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.register = function () {
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('register');
            };
        })
        .controller('registerController',function ($scope,$rootScope,$uibModalInstance,entitiesService) {
            $uibModalInstance.rendered.then(function(){
                entitiesService.switchBox();
            });

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            $scope.login = function () {
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('login');
            };
        });
})();
