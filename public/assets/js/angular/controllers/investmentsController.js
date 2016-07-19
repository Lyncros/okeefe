(function(){
    angular.module('okeefeSite.controllers')
        .controller('investmentsController',function ($scope,$rootScope, entitiesService) {
            entitiesService.view_animation('.animation-element');
            entitiesService.project_filter();
            entitiesService.toggle('.detalle','.item',200);
        });
})();
