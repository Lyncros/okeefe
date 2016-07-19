(function(){
    angular.module('okeefeSite.controllers')
        .controller('newsController',function ($scope,$rootScope, entitiesService) {
            entitiesService.news_filter();
        });
})();
