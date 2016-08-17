angular.module('starter.controllers')
    .controller('usRuralController', function($scope,defaultFactory) {
        $scope.data = defaultFactory.why_us;
    });
