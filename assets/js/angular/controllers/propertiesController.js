(function () {
    angular.module('okeefeSite.controllers')
        .controller('propertiesController',
            function (favoritesService, $scope, $timeout, $rootScope, $route, $uibModal, $routeParams, entitiesService,
                      searchApiService, defaultFactory, $auth, $location, SITE_URL, uiGmapGoogleMapApi) {
                $scope.siteUrl = SITE_URL;
                $scope.view = "grid";
                $scope.rev = false;
                $scope.propertyName = 'valor[0].contenido';
                $scope.properties = [];
                $scope.childFilters = [];
                $scope.totalPropertiesShow = {number: 30, scroll: true};
                $scope.orderChanged = 'valor[0].contenido';
                $scope.init = function () {
                    $scope.filters = {amb: {}, coch: {}, ant: {}, banos: {}, ubi: []};
                    $scope.errors = {};
                    $scope.loadingProperties = true;
                    $scope.reloadProperties = false;
                    $scope.map = {
                        center: {},
                        control: {},
                        markers: []
                    };
                    $scope.isLogged = $auth.isAuthenticated();
                    $scope.getData();

                };
                $scope.getParam = function () {
                    $scope.param = $location.search();
                    //console.log("$scope.param",$scope.param);
                    /*$scope.appliedFilters = {
                     supMin: (parseFloat($scope.param.supMin) || []),
                     supMax: (parseFloat($scope.param.supMax) || []),
                     valMin: (parseFloat($scope.param.valMin) || []),
                     valMax: (parseFloat($scope.param.valMax) || []),
                     amb: (parseFloat($scope.param.amb) || []),
                     coch: (parseFloat($scope.param.coch) || []),
                     ant: (parseFloat($scope.param.ant) || []),
                     banos: (parseFloat($scope.param.banos) || []),
                     ubi: (parseFloat($scope.param.ubication) || []),
                     };*/
                    $scope.appliedFilters = [];
                    $scope.appliedFilterslist = [];
                    $scope.filtroMon = ($scope.param.filtroMon || 'ARS');
                    $scope.valMin = (parseFloat($scope.param.valMin) || '');
                    $scope.valMax = (parseFloat($scope.param.valMax) || '');
                    $scope.supMin = (parseFloat($scope.param.supMin) || '');
                    $scope.supMax = (parseFloat($scope.param.supMax) || '');
                    //console.log("$scope.appliedFilters",$scope.appliedFilters);
                };


                $scope.getTipoInmueble = function (val) {
                    return entitiesService.getTipoInmueble(val);
                };

                $scope.sortBy = function (propertyName) {
                    $scope.propertyName = propertyName;
                };

                $scope.getTipoOperacion = function (val) {
                    return entitiesService.getTipoOperacion(val);
                };

                if ($scope.isLogged) {
                    favoritesService.count()
                        .then(function (data) {
                            $scope.favCount = data;
                        });
                }

                $scope.$on('$routeUpdate', function () {
                    $scope.reloadProperties = true;
                    $scope.init();
                });

                $scope.windowOptions = {
                    visible: false
                };

                $scope.verMas = function () {
                    if ($scope.properties.length > $scope.totalPropertiesShow.number) {
                        $scope.totalPropertiesShow.number += 20;
                    } else {
                        $scope.totalPropertiesShow.scroll = false;
                    }
                };

                $scope.closeClick = function () {
                    $scope.windowOptions.visible = !$scope.windowOptions.visible;
                };

                function setMap(data) {
                    if (data.goglat && data.goglong) {
                        $scope.map.center = {latitude: data.goglat, longitude: data.goglong};
                        var infoContent = {
                            title: (data.fichaweb && data.fichaweb[0]) ? data.fichaweb[0].contenido : data.calle,
                            sup: (data.sup_total && data.sup_total[0]) ? data.sup_total[0].contenido : '',
                            val: (data.valor && data.valor[0]) ? data.valor[0].contenido : '',
                            mon: (data.moneda && data.moneda[0]) ? data.moneda[0].contenido : ''
                        };
                        $scope.map.markers.push(
                            {
                                id: data.id_prop,
                                coords: {latitude: data.goglat, longitude: data.goglong},
                                options: {
                                    title: 'Ver Propiedad'
                                },
                                events: {
                                    mouseover: function () {
                                        angular.forEach($scope.map.markers, function (marker, keyM) {
                                            marker.window.options.visible = false;
                                        });
                                        this.$parent.marker.window.options.visible = true;
                                    },
                                    click: function () {
                                        return window.location = window.location.origin + window.location.pathname + '#!/ficha-propiedad/' + data.id_prop;
                                    }
                                },
                                window: {
                                    content: infoContent,
                                    templateUrl: 'templates/modals/windowPropertyMapContent.html',
                                    options: {
                                        visible: false
                                    },
                                    close: function () {
                                        this.options.visible = false;
                                    }
                                }
                            })
                    }
                }

                $scope.getObjectSize = function (obj, type) {
                    return entitiesService.objectSize(obj, type);
                };

                function getCarac(property) {
                    property['fichaweb'] = property.propiedad_caracteristicas.filter(function (item) {
                        return item.id_carac == 257;
                    });
                    property['descripcionweb'] = property.propiedad_caracteristicas.filter(function (item) {
                        return item.id_carac == 255;
                    });
                    property['valor'] = property.propiedad_caracteristicas.filter(function (item) {
                        return (item.id_carac == 164 || item.id_carac == 161);
                    });
                    property['sup_total'] = property.propiedad_caracteristicas.filter(function (item) {
                        return item.id_carac == 198;
                    });
                    property['moneda'] = property.propiedad_caracteristicas.filter(function (item) {
                        return (item.id_carac == 166 || item.id_carac == 165);
                    });
                    property['cantidad_ambientes'] = property.propiedad_caracteristicas.filter(function (item) {
                        return item.id_carac == 208;
                    });
                    property['cantidad_banos'] = property.propiedad_caracteristicas.filter(function (item) {
                        return item.id_carac == 71;
                    });
                    property['cantidad_cocheras'] = property.propiedad_caracteristicas.filter(function (item) {
                        return item.id_carac == 373;
                    });
                    property['cantidad_antiguedad'] = property.propiedad_caracteristicas.filter(function (item) {
                        return item.id_carac == 374;
                    });
                    if (property.cantidad_ambientes[0] != null) {
                        $scope.filters['amb'][property.cantidad_ambientes[0].contenido] = ( $scope.filters['amb'][property.cantidad_ambientes[0].contenido] + 1 || 1);
                    }
                    if (property.cantidad_cocheras[0] != null) {
                        $scope.filters['coch'][property.cantidad_cocheras[0].contenido] = ( $scope.filters['coch'][property.cantidad_cocheras[0].contenido] + 1 || 1);
                    }
                    if (property.cantidad_antiguedad[0] != null) {
                        $scope.filters['ant'][property.cantidad_antiguedad[0].contenido] = ( $scope.filters['ant'][property.cantidad_antiguedad[0].contenido] + 1 || 1);
                    }
                    if (property.cantidad_banos[0] != null) {
                        $scope.filters['banos'][property.cantidad_banos[0].contenido] = ( $scope.filters['banos'][property.cantidad_banos[0].contenido] + 1 || 1);
                    }
                    return property;
                }

                function totalProperties(data, padre = '', padres = '') {
                    padres += padre + ',';
                    if (data.properties) {
                        data.properties.forEach(function (property) {
                            property = getCarac(property);
                            property['padres'] = padres;
                            $scope.properties.push(property);
                            setMap(property);
                        });
                    }
                    //console.log("merge", $scope.properties);
                    if (data.child_ubication) {
                        data.child_ubication.forEach(function (ubication) {
                            totalProperties(ubication, data.id_ubica, padres);
                        });
                    }

                }

                function ubicationFilter(data, child) {
                    if (child) {
                        //console.log("data", data);
                        angular.forEach(data.child_ubication, function (ubic, keyP) {
                            //console.log(ubic.nombre_ubicacion);
                            $scope.childFilters.push({
                                key: ubic.id_ubica,
                                value: ubic.nombre_ubicacion,
                                count: (ubic.properties) ? ubic.properties.length : 0,
                                show: true,
                                padre: data.id_ubica
                            });
                        });
                    } else {
                        angular.forEach(data.child_ubication, function (ubic, keyP) {
                            //console.log(ubic.nombre_ubicacion);
                            $scope.filters['ubi'].push({
                                key: ubic.id_ubica,
                                value: ubic.nombre_ubicacion,
                                count: (ubic.properties) ? ubic.properties.length : 0,
                                show: true
                            });
                        });
                    }

                }

                $scope.getData = function () {
                    $scope.getParam();
                    searchApiService.searchApi.read($routeParams.tipo, $routeParams.operacion, $routeParams.ubicacion, $scope.param)
                        .then(function (response) {
                            console.log("res", response.data.data);
                            //$scope.properties = response.data.data[0].properties;
                            $scope.searchData = response.data.data[0];
                            //$scope.loadingProperties = false;
                            if ($scope.searchData) {
                                totalProperties($scope.searchData, $scope.searchData.id_ubica);
                                ubicationFilter($scope.searchData);
                            }
                        })
                        .then(function () {
                            if ($scope.isLogged) {
                                favoritesService.getAll(function (data) {
                                    return data;
                                })
                                    .then(function (data) {
                                        $scope.checkFav = function (id) {
                                            var result = data.some(function (el) {
                                                return el.id_prop == id;
                                            });

                                            return result;
                                        }
                                    })
                                    .then(function () {
                                        $scope.loadingProperties = false;
                                    });
                            } else {
                                $scope.checkFav = function (id) {
                                    return false;
                                };
                                $scope.loadingProperties = false;
                            }
                        });
                };
                $scope.getFilterName = function (filter) {
                    return entitiesService.filters(filter);
                };

                $scope.filtrarPropiedades = function (item, idx, all) {
                    //console.log("appliedFilters.ubi", $scope.appliedFilters.ubi);
                    var filters = $scope.appliedFilters;
                    //console.log("filters", filters);
                    var applied = false;
                    var results = {};
                    var matches = true;

                    for (var key in filters) {
                        var values = filters[key];
                        if (values.length && key != 'val' && key != 'sup') {
                            applied = true;
                            matches = false;
                        } else if (values && (key == 'val' || key == 'sup') && (values[0] && values[0].value || values[1] && values[1].value)) {
                            applied = true;
                            matches = false;
                        }
                        switch (key) {
                            case 'ubi':
                                /*console.log(item.padres);
                                 console.log(values);*/
                                if (item.padres && values.length) {
                                    values.forEach(function (val) {
                                        //console.log(val);
                                        if (item.padres.indexOf(val.key) != -1 || item.id_ubica == val.key) {
                                            matches = true;
                                            //console.log("contain");
                                        }
                                    });
                                }
                                break;
                            case 'childUbi':
                                /*console.log(item.padres);
                                 console.log(values);*/
                                if (item.padres && values.length) {
                                    values.forEach(function (val) {
                                        //console.log(val);
                                        if (item.padres.indexOf(val.key) != -1 || item.id_ubica == val.key) {
                                            matches = true;
                                            //console.log("contain");
                                        }
                                    });
                                }
                                break;
                            case 'amb':
                                if (item.cantidad_ambientes[0] && values.indexOf(item.cantidad_ambientes[0].contenido) != -1) {
                                    matches = true;
                                }
                                break;
                            case 'coch':
                                if (item.cantidad_cocheras[0] && values.indexOf(item.cantidad_cocheras[0].contenido) != -1) {
                                    matches = true;
                                }
                                break;
                            case 'ant':
                                if (item.cantidad_antiguedad[0] && values.indexOf(item.cantidad_antiguedad[0].contenido) != -1) {
                                    matches = true;
                                }
                                break;
                            case 'banos':
                                if (item.cantidad_banos[0] && values.indexOf(item.cantidad_banos[0].contenido) != -1) {
                                    matches = true;
                                }
                                break;
                            case 'val':
                                if (item.valor.length && values[0] && values[0].value && values[1] && values[1].value) {
                                    if (item.valor[0].contenido >= values[0].value
                                        && item.valor[0].contenido <= values[1].value) {
                                        matches = true;
                                    }
                                } else if (item.valor.length && values[0] && values[0].value
                                    && item.valor[0].contenido >= values[0].value) {
                                    matches = true;
                                } else if (item.valor.length && values[1] && values[1].value
                                    && item.valor[0].contenido <= values[1].value) {
                                    matches = true;
                                }
                                break;
                            case 'sup':
                                if (item.sup_total.length && values[0] && values[0].value && values[1] && values[1].value) {
                                    if (item.sup_total[0].contenido >= values[0].value
                                        && item.sup_total[0].contenido <= values[1].value) {
                                        matches = true;
                                    }
                                } else if (item.sup_total.length && values[0] && values[0].value
                                    && item.sup_total[0].contenido >= values[0].value) {
                                    matches = true;
                                } else if (item.sup_total.length && values[1] && values[1].value
                                    && item.sup_total[0].contenido <= values[1].value) {
                                    matches = true;
                                }
                                break;
                        }
                        results[key] = results[key] || matches;
                    }

                    if (!applied) {
                        // no hay ningun filtro activo
                        return true;
                    } else {
                        // nada matchea.
                        return _.all(_.values(results));
                    }
                };

                function findWithAttr(array, attr, value) {
                    for (var i = 0; i < array.length; i += 1) {
                        if (array[i][attr] === value) {
                            return i;
                        }
                    }
                    return -1;
                }

                function checkAttr(array, attr) {
                    for (var i = 0; i < array.length; i += 1) {
                        if (array[i]['key'] == attr) {
                            return i;
                        }
                    }
                    return -1;
                }

                $scope.addFilter = function (filter, value) {
                    $scope.appliedFilters[filter] = ($scope.appliedFilters[filter] || []);
                    if (filter == 'val') {
                        var index = checkAttr($scope.appliedFilterslist, 'valMin');
                        if (index != -1) {
                            $scope.appliedFilterslist[index].value = $scope.valMin;
                        } else {
                            $scope.appliedFilterslist.push({key: 'valMin', value: $scope.valMin});
                        }
                        index = checkAttr($scope.appliedFilterslist, 'valMax');
                        if (index != -1) {
                            $scope.appliedFilterslist[index].value = $scope.valMax;
                        } else {
                            $scope.appliedFilterslist.push({key: 'valMax', value: $scope.valMax});
                        }
                    } else if (filter == 'sup') {
                        var index = checkAttr($scope.appliedFilterslist, 'supMin');
                        if (index != -1) {
                            $scope.appliedFilterslist[index].value = $scope.supMin;
                        } else {
                            $scope.appliedFilterslist.push({key: 'supMin', value: $scope.supMin});
                        }
                        index = checkAttr($scope.appliedFilterslist, 'supMax');
                        if (index != -1) {
                            $scope.appliedFilterslist[index].value = $scope.supMax;
                        } else {
                            $scope.appliedFilterslist.push({key: 'supMax', value: $scope.supMax});
                        }
                    } else {
                        $scope.appliedFilterslist.push({key: filter, value: value});
                    }
                    if (filter == 'val') {
                        var index = checkAttr($scope.appliedFilters[filter], 'valMin');
                        if (index != -1) {
                            $scope.appliedFilters[filter][index].value = $scope.valMin;
                        } else {
                            $scope.appliedFilters[filter].push({key: 'valMin', value: $scope.valMin});
                        }
                        index = checkAttr($scope.appliedFilters[filter], 'valMax');
                        if (index != -1) {
                            $scope.appliedFilters[filter][index].value = $scope.valMax;
                        } else {
                            $scope.appliedFilters[filter].push({key: 'valMax', value: $scope.valMax});
                        }
                        $scope.valMin = '';
                        $scope.valMax = '';
                    } else if (filter == 'sup') {
                        var index = checkAttr($scope.appliedFilters[filter], 'supMin');
                        if (index != -1) {
                            $scope.appliedFilters[filter][index].value = $scope.supMin;
                        } else {
                            $scope.appliedFilters[filter].push({key: 'supMin', value: $scope.supMin});
                        }
                        index = checkAttr($scope.appliedFilters[filter], 'supMax');
                        if (index != -1) {
                            $scope.appliedFilters[filter][index].value = $scope.supMax;
                        } else {
                            $scope.appliedFilters[filter].push({key: 'supMax', value: $scope.supMax});
                        }
                        $scope.supMin = '';
                        $scope.supMax = '';
                    } else {
                        $scope.appliedFilters[filter].push(value);
                    }
                    if (filter == 'childUbi') {
                        $scope.childFilters[value.index].show = false;
                    }
                    if (filter == 'ubi') {
                        $scope.filters['ubi'][value.index].show = false;
                        ubicationFilter($scope.searchData.child_ubication[value.index], true);
                    }
                };

                $scope.removeFilter = function (filter) {
                    if (filter.key == 'valMin' || filter.key == 'valMax' || filter.key == 'supMin' || filter.key == 'supMax') {
                        var index = checkAttr($scope.appliedFilterslist, filter.key);
                        var fil = '';
                        $scope.appliedFilterslist[index].value = null;
                        if (filter.key == 'valMin' || filter.key == 'valMax') {
                            fil = 'val';
                            index = checkAttr($scope.appliedFilters[fil], filter.key);
                        } else if (filter.key == 'supMin' || filter.key == 'supMax') {
                            fil = 'sup';
                            index = checkAttr($scope.appliedFilters[fil], filter.key);
                        }
                        $scope.appliedFilters[fil][index].value = null;
                    } else {
                        var index = $scope.appliedFilters[filter.key].indexOf(filter.value);
                        $scope.appliedFilters[filter.key].splice(index, 1);
                        index = findWithAttr($scope.appliedFilterslist, 'value', filter.value);
                        $scope.appliedFilterslist.splice(index, 1);
                    }
                    if (filter == 'childUbi') {
                        $scope.childFilters[value.index].show = true;
                    }
                    if (filter.key == 'ubi') {
                        $scope.filters['ubi'][filter.value.index].show = true;
                        resetChildUbic(filter.value.key);
                    }

                };

                function deleteChildByVal(val) {
                    for (var key in $scope.appliedFilterslist) {
                        if ($scope.appliedFilterslist[key].key == "childUbi"
                            && $scope.appliedFilterslist[key].value.key == val) $scope.appliedFilterslist.splice(key, 1);
                    }
                    for (var key in $scope.appliedFilters.childUbi) {
                        if ($scope.appliedFilters.childUbi[key].key == val) $scope.appliedFilters.childUbi.splice(key, 1);
                    }
                }

                function resetChildUbic(val) {
                    for (var key in $scope.childFilters) {
                        if ($scope.childFilters[key].padre == val) {
                            deleteChildByVal($scope.childFilters[key].key);
                            delete  $scope.childFilters[key];
                        }
                    }
                }

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

                        var button = angular.element(".prop-" + id);

                        if (button.hasClass('btn-gris-claro-2')) {
                            button.removeClass('btn-gris-claro-2');
                            button.addClass('btn-gris-claro');
                            button.html(
                                '<span class="fa-stack">'
                                + '<i class="fa fa-circle fa-stack-2x"></i>'
                                + '<i class="fa fa-trash fa-stack-1x fa-inverse"></i>'
                                + '</span> Quitar </a>'
                            );
                        } else {
                            button.removeClass('btn-gris-claro');
                            button.addClass('btn-gris-claro-2');
                            button.html(
                                '<span class="fa-stack">'
                                + '<i class="fa fa-circle fa-stack-2x"></i>'
                                + '<i class="fa fa-heart fa-stack-1x fa-inverse"></i>'
                                + '</span> Favorito </a>')
                        }

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
                    $scope.modal = $uibModal.open({
                        templateUrl: 'templates/modals/account.html',
                        controller: 'accountController',
                        size: 'xl',
                        resolve: {
                            tab: function () {
                                return 'fav';
                            }
                        }
                    });

                    $scope.modal.result.catch(function () {
                        favoritesService.count()
                            .then(function (data) {
                                $scope.favCount = data;
                            })
                            .then(function () {
                                $scope.init();
                            });
                    });
                };

                $scope.init();
                entitiesService.banner();
            });


})();
