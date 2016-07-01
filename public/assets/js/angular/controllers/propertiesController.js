(function(){
    angular.module('okeefeSite.controllers')
        .controller('propertiesController',function ($scope,$rootScope, propertiesService) {
            var ico_marc = 'assets/img/marcador_1.png';
            var map_busqueda = new google.maps.Map(document.getElementById('mapa-busqueda'), {
                center: {lat: -34.7156697, lng: -58.2854728},
                zoom: 11
            });

            for (var i = 0; i < 3; i++) {
                var marcador_b = new google.maps.Marker({
                    position: {lat: -34.7156697-(i/20), lng: -58.2854728-(i/28)},
                    map: map_busqueda,
                    title: "Edificio Lorem Ipsum",
                    icon: ico_marc
                });
            };
            $scope.view = "grid";
            $scope.changeView = function (view) {
                $scope.view = view;
            }
        });
})();
