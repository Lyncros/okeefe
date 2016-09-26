(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('newsRuralController',function ($scope,$rootScope,dictionaryFactory,defaultFactory,entitiesService) {
            $scope.trustSrc = function (url) {
                return entitiesService.trustSrc(url);
            };
            $scope.filter = 2;
            $scope.news = defaultFactory.news;
            $scope.dictionary = dictionaryFactory.dictionary;
        });
})();
