(function(){
    angular.module('okeefeRuralSite.controllers')
        .controller('newsController',function ($scope,$rootScope) {
            var $fichas;
            $('.fichas').imagesLoaded( function(){
                $fichas = $('.fichas').isotope({
                    // options
                    itemSelector: '.ficha',
                    layoutMode: 'masonry'
                });
            });


            $('.filtrar-rev').click(function(){
                $fichas.isotope({ filter: '.revista' })
            });
            $('.filtrar-pren').click(function(){
                $fichas.isotope({ filter: '.prensa' })
            });
        });
})();
