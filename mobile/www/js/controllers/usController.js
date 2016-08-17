angular.module('starter.controllers')
    .controller('usController', function($scope,defaultFactory) {
        $scope.data = defaultFactory.why_us;
    });
