(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('aboutController',function ($scope,$rootScope, $timeout, uiGmapGoogleMapApi,defaultFactory,entitiesService) {
            $scope.init = function () {
                $scope.maps = defaultFactory.about_maps;
                $scope.options = defaultFactory.options;
                $scope.team = defaultFactory.team;
                var param = {rowHeight: 300};
                entitiesService.flexImages('.flex-images',param);
                entitiesService.toggle('.detalle','.item',200);

                $timeout(function() {
                    entitiesService.carouselByOne('.carousel-showmanymoveone .item','#slider-equipo');
                }, 0);
            };

            $scope.goToDiv = function (id) {
                entitiesService.goToDiv(id)
            };

            $scope.init();
        });
})();
