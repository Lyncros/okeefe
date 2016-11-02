(function () {
    angular.module('okeefeSite.controllers')
        .controller('ventureSheetController',
            function (favoritesService, $scope, $rootScope, $timeout, entitiesService, defaultFactory,
                      $auth, $uibModal, $routeParams, searchApiService, okeefeApiService, SITE_URL, emprendimiento) {
                $scope.siteUrl = SITE_URL;
                $scope.resultFav = false;
                $scope.favCount = 0;
                $scope.pdfFile = '';
                $scope.limitProp = 7;
                $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
                $scope.psForm = function ($event) {
                    $event.preventDefault();
                    if (!$scope.psContactForm.nombre || !$scope.psContactForm.apellido || !$scope.psContactForm.email || !$scope.psContactForm.telefono || !$scope.psContactForm.celular || !$scope.psContactForm.comentarios) {
                        $scope.psContactForm.error = true;
                        return false;
                    }
                    $scope.psContactForm.comentarios = "Propiedad (" + $routeParams.id + ") - " + $scope.psContactForm.comentarios;
                    okeefeApiService.API.send($scope.psContactForm).then(function (response) {
                        entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
                        $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
                    }, function errorCallback(response) {
                        entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
                        console.log("error :", response);
                    });
                };

                $scope.verTodas = function (show) {
                    $scope.limitProp = 7;
                    if(show){
                        $scope.limitProp = $scope.property.properties.length;
                    }
                };

                $scope.pdf = function () {
                    okeefeApiService.API.getPDF($scope.property).then(function (response) {
                        $scope.pdfFile = response;
                    }, function errorCallback(response) {
                    });
                };

                $scope.getTipoOperacion = function (val) {
                    return entitiesService.getTipoOperacion(val);
                };

                $scope.downloadPDF = function () {
                    window.open($scope.pdfFile);
                };
                $scope.init = function () {
                    $scope.isLogged = $auth.isAuthenticated();
                    $scope.map = {
                        center: {},
                        control: {},
                        markers: []
                    };
                    $scope.getData(emprendimiento);
                    entitiesService.popover();
                    $scope.tab = 'f';
                };

                if ($scope.isLogged) {
                    favoritesService.count()
                        .then(function (data) {
                            $scope.favCount = data;

                        });
                }

                function setPropChar(data) {
                    angular.forEach(data.properties, function (value, key) {
                        value.cantidad_ambientes = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 208
                        });
                        value.amenities = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 20
                        });
                        value.moneda = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 165
                        });
                        value.valor = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 161
                        });
                        value.estado = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 42
                        });
                        value.desc = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 255
                        });
                        value.fichaweb = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 257
                        });
                        value.sup_total = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 198
                        });
                        value.descripcionweb = value.propiedad_caracteristicas.filter(function (d) {
                            return d.id_carac == 255
                        });

                    });
                    $timeout(function () {
                        entitiesService.carouselByOne('.carousel-showmanymoveone .item');
                    }, 0);
                    //console.log($scope.property);
                }

                function setChar(data) {
                    $scope.property.terminaciones = data.filter(function (d) {
                        return d.id_carac == 73
                    });
                    $scope.property.amenities = data.filter(function (d) {
                        return d.id_carac == 71
                    });
                    $scope.property.fotos = data.filter(function (d) {
                        return d.id_carac == 75
                    });
                }

                function setMap(data) {
                    if (data && data.goglat && data.goglong && (data.ubica.length || data.nomedif)) {
                        $scope.map.center = {latitude: data.goglat, longitude: data.goglong};
                        var title = (data.ubica.length) ? data.ubica[0].valor : data.nomedif;
                        $scope.map.markers.push(
                            {
                                id: data.id_prop,
                                coords: {latitude: data.goglat, longitude: data.goglong},
                                options: {
                                    title: title
                                }
                            })
                    }
                }

                $scope.getParam = function () {
                    //console.log($routeParams);
                    $scope.param = $routeParams.id;
                };

                function setData(response) {
                    $scope.property = response.data;
                    //setMap($scope.property);
                    setPropChar($scope.property);
                    setChar($scope.property.caracteristicas);
                    $scope.pdf();
                    $timeout(function () {
                        //entitiesService.wowSlider();
                    }, 0);
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

                }

                $scope.getData = function (emprendimiento) {
                    $scope.getParam();
                    if (emprendimiento) {
                        setData(emprendimiento);
                    } else {
                        searchApiService.searchApi.readById($scope.param, true)
                            .then(function (response) {
                                setData(response);
                            })
                    }
                };

                $scope.control = {};

                $scope.refreshMap = function () {
                    entitiesService.refreshMap($scope);
                };

                $scope.moveArrow = function (key) {
                    $scope.tab = key;
                    var pos = 1;
                    if (key == 'f') {
                        entitiesService.moveArrow('property', pos);
                        return null;
                    }
                    if ($scope.property.video) {
                        pos++;
                    }
                    if (key == 'v') {
                        entitiesService.moveArrow('property', pos);
                        return null;
                    }
                    if ($scope.property.goglat || $scope.property.goglong) {
                        pos++;
                    }
                    if (key == 'm') {
                        entitiesService.moveArrow('property', pos);
                        return null;
                    }
                    if ($scope.property.plano1 || $scope.property.plano2 || $scope.property.plano3) {
                        pos++;
                    }
                    if (key == 'p') {
                        entitiesService.moveArrow('property', pos);
                        return null;
                    }
                    if ($scope.property.resumen) {
                        pos++;
                    }
                    if (key == 't') {
                        entitiesService.moveArrow('property', pos);
                        return null;
                    }
                };
                $scope.doFav = function (id) {
                    if ($scope.isLogged) {
                        $scope.resultFav = !$scope.resultFav;

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
                            size: 'lg'
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
                            });
                    });
                };

                $scope.trustAsHtml = function (html) {
                    return entitiesService.trustHtml(html);
                };


                $scope.init();

            })
})();

