angular.module('starter.controllers')
    .controller('newsController', function($scope,defaultFactory,dictionaryFactory) {
        $scope.news = defaultFactory.news;
        $scope.filter = 1;
        $scope.dictionary = dictionaryFactory.dictionary;
        $scope.toggleGroup = function(group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };
    })
