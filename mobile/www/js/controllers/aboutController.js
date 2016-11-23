angular.module('starter.controllers')
    .controller('aboutController', function($scope, defaultFactory) {
      $scope.team = defaultFactory.team;
    })

