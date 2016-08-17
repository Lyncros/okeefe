(function () {
    angular.module('okeefeSite.controllers')
        .controller('propertiesController',
            function ($scope, $rootScope, $uibModal, entitiesService, searchApiService, defaultFactory, $auth, $location) {
                $scope.filters = {amb: {}, coch: {}, ant: {}, banos: {}};
                $scope.errors = {};
                $scope.order = 'valor';
                $scope.properties = [];
                $scope.loadingProperties = true;
                $scope.map = defaultFactory.property_map;
                $scope.isLogged = $auth.isAuthenticated();
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
                        filtroMon: ($scope.param.filtroMon || 'ARS')
                    };
                    //console.log("$scope.appliedFilters",$scope.appliedFilters);
                };

                $scope.getTipoInmueble = function (val) {
                    return entitiesService.tipoInmueble(val);
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
                };

                $scope.getObjectSize = function (obj) {
                    return entitiesService.objectSize(obj);
                };
                function setProperties(obj) {
                    angular.forEach(obj, function (value, key) {
                        angular.forEach(value.propiedades, function (prop) {
                            $scope.properties.push(prop);
                        });
                    });
                    $scope.loadingProperties = false;
                    console.log("bien", $scope.properties);
                    if ($scope.properties.length) {
                        totalFilters($scope.properties);
                        setMap($scope.properties);
                    }
                };

                $scope.getData = function () {
                    $scope.getParam();
                    searchApiService.searchApi.read($scope.param).then(function (response) {
                        setProperties(response.data.data);
                    }, function errorCallback(response) {
                        console.log("error :", response);
                    });
                };
                $scope.getFilterName = function (filter) {
                    return entitiesService.filters(filter);
                };
                $scope.removeFilter = function (filter) {
                    delete $scope.param[filter];
                    return window.location = entitiesService.applyFilter('', '', $scope.param, '', '');
                };
                $scope.addFilter = function (filter, value) {
                    if (filter == 'sup') {
                        $scope.errors.sup = false;
                        if (!$scope.appliedFilters.supMin && !$scope.appliedFilters.supMax) {
                            $scope.errors.sup = true;
                            return false;
                        }
                        return window.location = entitiesService.applyFilter(filter, '', $scope.param, $scope.appliedFilters.supMin, $scope.appliedFilters.supMax);
                    } else if (filter == 'val') {
                        $scope.errors.sup = false;
                        if (!$scope.appliedFilters.valMin && !$scope.appliedFilters.valMax) {
                            $scope.errors.val = true;
                            return false;
                        }
                        return window.location = entitiesService.applyFilter(filter, '', $scope.param, $scope.appliedFilters.valMin, $scope.appliedFilters.valMax, $scope.appliedFilters.filtroMon);
                    } else if (filter in $scope.param) {
                        return window.location = entitiesService.applyFilter(filter, value, $scope.param, '', '');
                    }
                    return window.location = window.location.href + '&' + filter + '=' + value;

                };

                $scope.getData();
                $scope.view = "grid";

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


                $scope.editFav = function () {
                    var modal = $uibModal.open({
                        templateUrl: 'templates/modals/fav.html',
                        controller: 'accountController',
                        size: 'xl',
                        resolve: {
                            //
                        }
                    });
                    modal.result.then(function () {
                        // guardar
                    });
                    modal.result.catch(function () {
                    });
                };

                entitiesService.banner();
            });
})();
