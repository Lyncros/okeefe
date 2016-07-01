(function(){
    angular.module('okeefeSite.controllers')
        .controller('aboutController',function ($scope,$rootScope, propertiesService) {
            var map_q, map_h;
            var ico_marc = 'assets/img/marcador_1.png'
            /*MAPA QUILMES*/
            map_q = new google.maps.Map(document.getElementById('mapa-quilmes'), {
                center: {lat: -34.7156697, lng: -58.2854728},
                zoom: 16
            });
            var marcador_q = new google.maps.Marker({
                position: {lat: -34.7156697, lng: -58.2854728},
                map: map_q,
                title: "Inmobiliaria O'keefe",
                icon: ico_marc
            });
            /*MAPA HUDSON*/
            map_h = new google.maps.Map(document.getElementById('mapa-hudson'), {
                center: {lat: -34.812566, lng: -58.177723},
                zoom: 16
            });
            var marcador_h = new google.maps.Marker({
                position: {lat: -34.812566, lng: -58.177723},
                map: map_h,
                tittle: "Inmobiliaria O'keefe",
                icon: ico_marc
            });
            /*MAPA GOLONDRINAS*/
            map_g = new google.maps.Map(document.getElementById('mapa-golondrinas'), {
                center: {lat: -34.77891426062949, lng: -58.16106375896312},
                zoom: 16
            });
            var marcador_g = new google.maps.Marker({
                position: {lat: -34.77891426062949, lng: -58.16106375896312},
                map: map_g,
                tittle: "Inmobiliaria O'keefe",
                icon: ico_marc
            });
            /*MAPA NUEVO QUILMES*/
            map_n = new google.maps.Map(document.getElementById('mapa-nuevo'), {
                center: {lat: -34.77891426062949, lng: -58.16106375896312},
                zoom: 16
            });
            var marcador_n = new google.maps.Marker({
                position: {lat: -34.77891426062949, lng: -58.16106375896312},
                map: map_n,
                tittle: "Inmobiliaria O'keefe",
                icon: ico_marc
            });
            $('.flex-images').flexImages({rowHeight: 300});

            $('.detalle').toggle();
            $('.item').hover(function(){
                $(this).find('.detalle').fadeToggle();
            });
        });
})();
