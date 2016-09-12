(function () {
    angular.module('okeefeSite.controllers')
        .controller('propertiesController',
            function (favoritesService, $scope, $rootScope, $route, $uibModal, $routeParams, entitiesService, searchApiService, defaultFactory, $auth, $location) {
                $scope.view = "grid";
                $scope.rev = false;
                $scope.propertyName = 'valor';
                $scope.orderChanged = 'valor';
                $scope.init = function () {
                    $scope.filters = {amb: {}, coch: {}, ant: {}, banos: {}};
                    $scope.errors = {};
                    $scope.loadingProperties = true;
                    $scope.reloadProperties = false;
                    $scope.map = defaultFactory.property_map;
                    $scope.isLogged = $auth.isAuthenticated();
                    $scope.getData();
                };
                $scope.getParam = function () {
                    $scope.param = $location.search();
                    //console.log("$scope.param",$scope.param);
                    $scope.appliedFilters = {
                        supMin: (parseFloat($scope.param.supMin) || ''),
                        supMax: (parseFloat($scope.param.supMax) || ''),
                        valMin: (parseFloat($scope.param.valMin) || ''),
                        valMax: (parseFloat($scope.param.valMax) || ''),
                        amb: (parseFloat($scope.param.amb) || ''),
                        coch: (parseFloat($scope.param.coch) || ''),
                        ant: (parseFloat($scope.param.ant) || ''),
                        banos: (parseFloat($scope.param.banos) || ''),
                    };
                    $scope.filtroMon = ($scope.param.filtroMon || 'ARS');
                    $scope.valMin = (parseFloat($scope.param.valMin) || '');
                    $scope.valMax = (parseFloat($scope.param.valMax) || '');
                    $scope.supMin = (parseFloat($scope.param.supMin) || '');
                    $scope.supMax = (parseFloat($scope.param.supMax) || '');
                    //console.log("$scope.appliedFilters",$scope.appliedFilters);
                };

                $scope.getTipoInmueble = function (val) {
                    return entitiesService.tipoInmueble(val);
                };

                $scope.sortBy = function (propertyName) {
                    //console.log(propertyName);
                    $scope.propertyName = propertyName;
                };

                $scope.getTipoOperacion = function (val) {
                    return entitiesService.tipoOperacion(val);
                };

                function totalFilters(arr) {
                    angular.forEach(arr, function (prop, keyP) {
                        $scope.filters['amb'][prop.cantidad_ambientes] = ( $scope.filters['amb'][prop.cantidad_ambientes] + 1 || 1);
                        $scope.filters['coch'][prop.cantidad_cocheras] = ( $scope.filters['coch'][prop.cantidad_cocheras] + 1 || 1);
                        $scope.filters['ant'][prop.cantidad_antiguedad] = ( $scope.filters['ant'][prop.cantidad_antiguedad] + 1 || 1);
                        $scope.filters['banos'][prop.cantidad_banos] = ( $scope.filters['banos'][prop.cantidad_banos] + 1 || 1);
                    });
                    //console.log("$scope.filters",$scope.filters);
                }

                $scope.$on('$routeUpdate', function () {
                    $scope.reloadProperties = true;
                    $scope.init();
                });

                function setMap(data) {
                    $scope.map.center = {latitude: data[0].goglat, longitude: data[0].goglong};
                    angular.forEach(data, function (prop, keyP) {
                        if (prop.goglat && prop.goglong) {
                            $scope.map.markers.push(
                                {
                                    id: keyP,
                                    coords: {latitude: prop.goglat, longitude: prop.goglong},
                                    options: {
                                        title: 'Ver Propiedad'
                                    },
                                    events: {
                                        click: function () {
                                            return window.location = window.location.origin + window.location.pathname + '#/ficha-propiedad/' + prop.id_prop;
                                        }
                                    }
                                })
                        }
                    });
                }

                $scope.getObjectSize = function (obj) {
                    return entitiesService.objectSize(obj);
                };

                /*function setProperties(obj) {
                 angular.forEach(obj, function (value, key) {
                 angular.forEach(value.propiedades, function (prop) {
                 $scope.properties.push(prop);
                 });
                 });
                 $scope.loadingProperties = false;
                 //console.log("bien", $scope.properties);
                 if ($scope.properties.length) {
                 totalFilters($scope.properties);
                 setMap($scope.properties);
                 }
                 }*/

                $scope.getData = function () {
                    $scope.getParam();
                    searchApiService.searchApi.read($routeParams.tipo, $routeParams.operacion, $scope.param).then(function (response) {
                        //console.log("res", response.data.data);
                        $scope.properties = response.data.data.propiedades;
                        $scope.loadingProperties = false;
                        if ($scope.properties.length) {
                            totalFilters($scope.properties);
                            setMap($scope.properties);
                        }
                    }, function errorCallback(response) {
                        console.log("error :", response);
                    });
                };
                $scope.getFilterName = function (filter) {
                    return entitiesService.filters(filter);
                };
                $scope.removeFilter = function (filter) {
                    delete $scope.param[filter];
                    //console.log("scope.param",$scope.param);
                    return window.location = entitiesService.applyFilter('', '', $routeParams.tipo, $routeParams.operacion, $scope.param, '', '');
                };
                $scope.addFilter = function (filter, value) {
                    //console.log("$scope.valMin",$scope.valMin);
                    //console.log("$scope.valMax",$scope.valMax);
                    if (filter == 'sup') {
                        $scope.errors.sup = false;
                        if (!$scope.supMin && !$scope.supMax) {
                            $scope.errors.sup = true;
                            return false;
                        }
                        return window.location = entitiesService.applyFilter(filter, '', $routeParams.tipo, $routeParams.operacion, $scope.param, $scope.supMin, $scope.supMax);
                    } else if (filter == 'val') {
                        $scope.errors.sup = false;
                        if (!$scope.valMin && !$scope.valMax) {
                            $scope.errors.val = true;
                            return false;
                        } else if ($scope.valMin > $scope.valMax) {
                            console.log("error");
                            return false;
                        }
                        return window.location = entitiesService.applyFilter(filter, '', $routeParams.tipo, $routeParams.operacion, $scope.param, $scope.valMin, $scope.valMax, $scope.filtroMon);
                    } else if (filter in $scope.param) {
                        return window.location = entitiesService.applyFilter(filter, value, $routeParams.tipo, $routeParams.operacion, $scope.param, '', '');
                    }
                    return window.location = window.location.href + '&' + filter + '=' + value;

                };


                $scope.changeView = function (view) {
                    $scope.view = view;
                };
                $scope.trustAsHtml = function (html) {
                    return entitiesService.trustHtml(html);
                };

                $scope.control = {};
                $scope.refreshMap = function () {
                    entitiesService.refreshMap($scope);
                };
                $rootScope.$on('searchChanged', function (event, data) {
                    $scope.getParam();
                });

                $scope.doFav = function (id) {
                    if ($scope.isLogged) {
                        favoritesService.setFavorite(id)
                            .then(function () {
                                favoritesService.count()
                                    .then(function (data) {
                                        $scope.favCount = data;
                                });
                            });
                    } else {
                        var modal = $uibModal.open({
                            templateUrl: 'templates/modals/login.html',
                            controller: 'loginController',
                            size: 'lg',
                        });
                    }
                };

                if ($scope.isLogged) {
                    favoritesService.count()
                        .then(function (data) {

                            $scope.favCount = data;
                        });
                }

                $scope.editFav = function () {
                    var modal = $uibModal.open({
                        templateUrl: 'templates/modals/account.html',
                        controller: 'accountController',
                        size: 'xl',
                        resolve: {
                            tab: function () {
                                return 'fav';
                            }
                        }
                    });
                    modal.result.then(function () {
                        // guardar
                    });
                    modal.result.catch(function () {
                    });
                };
                $scope.init();
                entitiesService.banner();
            });


})();
