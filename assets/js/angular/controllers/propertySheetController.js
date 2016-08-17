(function () {
    angular.module('okeefeSite.controllers')
        .controller('propertySheetController',
            function ($scope, $rootScope, $timeout, entitiesService, defaultFactory, $auth, $uibModal, $routeParams, searchApiService) {

                $scope.init = function () {
                    $scope.isLogged = $auth.isAuthenticated();
                    $scope.map = defaultFactory.property_sheet_map;
                    $scope.getData();
                    entitiesService.popover();
                    $scope.tab = 'f';
                };

                function setChar(data) {
                    $scope.property.ambientes = data.filter(function (d) { return d.caracteristica.id_tipo_carac == 16 });
                    $scope.property.caracteristicas = data.filter(function (d) { return d.caracteristica.id_tipo_carac == 9 });
                    $scope.property.servicios = data.filter(function (d) { return d.caracteristica.id_tipo_carac == 23 });
                    $scope.property.amenities = data.filter(function (d) { return d.caracteristica.id_tipo_carac == 20 });
                    $scope.property.caracteristicasEdificio = data.filter(function (d) { return d.caracteristica.id_tipo_carac == 19 });
                    $scope.property.titulo = data.filter(function (d) { return d.caracteristica.id_carac == 257 });
                    //console.log($scope.property);
                }

                function setMap(data) {
                    if (data && data.goglat && data.goglong) {
                        $scope.map.center = {latitude: data.goglat, longitude: data.goglong};
                        $scope.map.markers.push(
                            {
                                id: data.id_prop,
                                coords: {latitude: data.goglat, longitude: data.goglong},
                                options: {
                                    title: data.ubica[0].valor
                                }
                            })
                    }
                };

                $scope.getParam = function () {
                    //console.log($routeParams);
                    $scope.param = $routeParams.id;
                };
                $scope.getData = function () {
                    $scope.getParam();
                    searchApiService.searchApi.readById($scope.param).then(function (response) {
                        $scope.property = response.data;
                        setMap($scope.property);
                        setChar($scope.property.propiedad_caracteristicas);
                        $timeout(function () {
                            entitiesService.wowSlider();
                        }, 1000);
                        console.log("bien", response);
                    }, function errorCallback(response) {
                        console.log("error :", response);
                    });
                };

                $scope.control = {};
                $scope.refreshMap = function () {
                    entitiesService.refreshMap($scope);
                };

                $scope.moveArrow = function (key) {
                    $scope.tab = key;
                    var pos = 1;
                    if(key == 'f'){entitiesService.moveArrow('property', pos); return null;}
                    if($scope.property.video){pos++;}
                    if(key == 'v'){entitiesService.moveArrow('property', pos); return null;}
                    if($scope.property.goglat || $scope.property.goglong){pos++;}
                    if(key == 'm'){entitiesService.moveArrow('property', pos); return null;}
                    if($scope.property.plano1 || $scope.property.plano2 || $scope.property.plano3){pos++;}
                    if(key == 'p'){entitiesService.moveArrow('property', pos); return null;}
                    if($scope.property.resumen){pos++;}
                    if(key == 't'){entitiesService.moveArrow('property', pos); return null;}
                };

                $scope.doFav = function () {
                    if ($scope.isLogged) {

                    } else {
                        var modal = $uibModal.open({
                            templateUrl: 'templates/modals/login.html',
                            controller: 'loginController',
                            size: 'lg',
                        });
                    }
                };

                $scope.init();

            })
        .controller('ventureSheetController',
            function ($scope, $rootScope, entitiesService, defaultFactory, $auth, $uibModal) {

                $scope.isLogged = $auth.isAuthenticated();

                $scope.init = function () {
                    entitiesService.popover();
                    $scope.map = defaultFactory.property_map;
                    $scope.control = {};
                };

                $scope.refreshMap = function () {
                    entitiesService.refreshMap($scope);
                };

                $scope.moveArrow = function (key) {
                    entitiesService.moveArrow('venture', key);
                };

                $scope.doFav = function () {
                    if ($scope.isLogged) {

                    } else {
                        var modal = $uibModal.open({
                            templateUrl: 'templates/modals/login.html',
                            controller: 'loginController',
                            size: 'lg',
                        });
                    }
                };

                $scope.init();
            });
})();
