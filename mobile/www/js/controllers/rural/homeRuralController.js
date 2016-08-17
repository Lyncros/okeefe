angular.module('starter.controllers')
    .controller('homeRuralController', function ($scope, $ionicSlideBoxDelegate, $ionicModal) {
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };
        $scope.property = null;
        $scope.operation = null;

        $ionicModal.fromTemplateUrl('templates/modal/selectPropertyModal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.propertyModal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/modal/selectOperationModal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.operationModal = modal;
        });

        $scope.selectProperty = function (u) {
            $scope.property = u;
            $scope.propertyModal.hide();
        };
        $scope.selectOperation = function (u) {
            $scope.operation = u;
            $scope.operationModal.hide();
        };
    })
