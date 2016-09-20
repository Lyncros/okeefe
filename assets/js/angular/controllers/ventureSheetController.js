(function () {
    angular.module('okeefeSite.controllers')
        .controller('ventureSheetController',
            function ($scope, $rootScope, entitiesService, defaultFactory, $auth, $uibModal,$timeout, searchApiService,favoritesService) {

                $scope.isLogged = $auth.isAuthenticated();
                $scope.getParam = function () {
                    //console.log($routeParams);
                    $scope.param = $routeParams.id;
                };

                function setChar(data) {
                    $scope.property.ambientes = data.filter(function (d) {
                        return d.caracteristica.id_tipo_carac == 16
                    });
                    $scope.property.caracteristicas = data.filter(function (d) {
                        return d.caracteristica.id_tipo_carac == 9
                    });
                    $scope.property.servicios = data.filter(function (d) {
                        return d.caracteristica.id_tipo_carac == 23
                    });
                    $scope.property.amenities = data.filter(function (d) {
                        return d.caracteristica.id_tipo_carac == 20
                    });
                    $scope.property.caracteristicasEdificio = data.filter(function (d) {
                        return d.caracteristica.id_tipo_carac == 19
                    });
                    $scope.property.titulo = data.filter(function (d) {
                        return d.caracteristica.id_carac == 257
                    });
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
                }

                $scope.getData = function () {
                    $scope.getParam();
                    searchApiService.searchApi.readById($scope.param)
                        .then(function (response) {
                            $scope.property = response.data;
                            setMap($scope.property);
                            setChar($scope.property.propiedad_caracteristicas);
                            $timeout(function () {
                                entitiesService.wowSlider();
                                entitiesService.carouselByOne('.carousel-showmanymoveone .item');
                            }, 0);

                            return response.data;
                        })
                        .then(function () {
                            if ($scope.isLogged) {
                                favoritesService.getAll(function (data) {
                                    return data;
                                })
                                    .then(function (data) {

                                        var isFav = data.some(function (el) {
                                            return el.id_prop == $scope.property.id_prop;
                                        });

                                        $scope.resultFav = isFav;

                                    })
                                    .then(function () {
                                        $scope.loadingProperties = false;
                                    });
                            } else {
                                $scope.resultFav = false;
                                $scope.loadingProperties = false;
                            }
                        });
                    searchApiService.searchApi.readSuggested($scope.param)
                        .then(function (response) {
                            $scope.properties = response.data;
                        });
                };


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

