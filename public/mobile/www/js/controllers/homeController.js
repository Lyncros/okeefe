angular.module('starter.controllers', [])
  .controller('homeController', function($scope,$ionicSlideBoxDelegate) {
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

  })
