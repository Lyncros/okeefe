angular.module('starter.controllers')
    .controller('registerController', function ($scope, $ionicModal) {
        $scope.register = {
            secretQuestion : null
        };

        $ionicModal.fromTemplateUrl('templates/modal/secretQuestionModal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.secretQuestionModal = modal;
        });

        $scope.selectQuestion = function (u) {
            $scope.register.secretQuestion = u;
            $scope.secretQuestionModal.hide();
        };
    })
