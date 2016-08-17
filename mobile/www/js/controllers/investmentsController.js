angular.module('starter.controllers')
  .controller('investmentsController', function($scope,defaultFactory) {
    $scope.investments_timing = defaultFactory.investments_timing;
  });
