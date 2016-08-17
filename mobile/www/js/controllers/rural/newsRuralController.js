angular.module('starter.controllers')
    .controller('newsRuralController', function($scope,defaultFactory,dictionaryFactory,entitiesService) {
        $scope.news = defaultFactory.news;
        $scope.filter = 1;
        $scope.dictionary = dictionaryFactory.dictionary;
        $scope.toggleGroup = function(group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };
        $scope.trustSrc = function (url) {
            return entitiesService.trustSrc(url);
        }
    })
