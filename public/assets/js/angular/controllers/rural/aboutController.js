(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('aboutController',function ($scope,$rootScope,uiGmapGoogleMapApi,defaultFactory,entitiesService) {
            /*MAPA QUILMES*/
            $scope.maps = defaultFactory.about_maps;
            $scope.options = defaultFactory.options;

            $scope.init = function () {
                var param = {rowHeight: 300};
                entitiesService.flexImages('.flex-images',param);
                entitiesService.toggle('.detalle','.item',200);
                entitiesService.carouselByOne('.carousel-showmanymoveone .item');
            };

            $scope.goToDiv = function (id) {
                entitiesService.goToDiv(id)
            };

            $scope.init();
        });
})();
