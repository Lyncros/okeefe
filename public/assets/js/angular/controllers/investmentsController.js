(function(){
    angular.module('okeefeSite.controllers')
        .controller('investmentsController',function ($scope,$rootScope, propertiesService) {
            $('.flex-images').flexImages({rowHeight: 180});
            $('.detalle').toggle();
            $('.item').hover(function(){
                $(this).find('.detalle').fadeToggle();
            });
        });
})();
