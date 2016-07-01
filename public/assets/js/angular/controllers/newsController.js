(function(){
    angular.module('okeefeSite.controllers')
        .controller('newsController',function ($scope,$rootScope, propertiesService) {
            var $fichas = $('.fichas').isotope({
                // options
                itemSelector: '.ficha',
                layoutMode: 'masonry'
            });

            $('.filtrar-rev').click(function(){
                $fichas.isotope({ filter: '.revista' })
            });
            $('.filtrar-pren').click(function(){
                $fichas.isotope({ filter: '.prensa' })
            });
            $('.filtrar-dicc').click(function(){
                $fichas.isotope({ filter: '.diccionario' })
            });
        });
})();
