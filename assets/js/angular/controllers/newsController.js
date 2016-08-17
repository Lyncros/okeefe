(function(){
    angular.module('okeefeSite.controllers')
        .controller('newsController',function ($scope,$rootScope, entitiesService,dictionaryFactory,defaultFactory) {
            $scope.trustSrc = function (url) {
                return entitiesService.trustSrc(url);
            };

            $scope.filter = 0;
            $scope.news = defaultFactory.news;
            $scope.dictionary = dictionaryFactory.dictionary;
        });
})();
