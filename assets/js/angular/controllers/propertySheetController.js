(function () {
    angular.module('okeefeSite.controllers')
        .controller('propertySheetController',
            function (favoritesService, $scope, $rootScope, $timeout, entitiesService, defaultFactory,
                      $auth, $uibModal, $routeParams, searchApiService, okeefeApiService, SITE_URL) {
                $scope.siteUrl = SITE_URL;
                $scope.resultFav = false;
                $scope.favCount = 0;
                $scope.pdfFile = '';
                $scope.showPl = false;
                $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
                $scope.psForm = function ($event) {
                    $event.preventDefault();
                    if (!$scope.psContactForm.nombre || !$scope.psContactForm.apellido || !$scope.psContactForm.email || !$scope.psContactForm.telefono || !$scope.psContactForm.celular || !$scope.psContactForm.comentarios) {
                        $scope.psContactForm.error = true;
                        return false;
                    }
                    $scope.psContactForm.comentarios = "Propiedad (" + $routeParams.id + ") - " + $scope.psContactForm.comentarios;
                    okeefeApiService.API.send($scope.psContactForm).then(function (response) {
                        entitiesService.showAlert($scope, 'Gracias por enviar.', 'success', 3000);
                        $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
                    }, function errorCallback(response) {
                        entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
                        console.log("error :", response);
                    });
                };

                $scope.pdf = function () {
                    $scope.property.pdfRoute = 'property';
                    okeefeApiService.API.getPDF($scope.property).then(function (response) {
                        $scope.pdfFile = response;
                    }, function errorCallback(response) {
                    });
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
                    $scope.getData();
                    entitiesService.popover();
                    $scope.tab = 'f';
                    $rootScope.$broadcast('changeTitle', { title: 'Okeefe > Propiedad'});

                };

                if ($scope.isLogged) {
                    favoritesService.count()
                        .then(function (data) {
                            $scope.favCount = data;

                        });
                }

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
                    $scope.property.moneda = data.filter(function (d) {
                        return d.caracteristica.id_carac == 165
                    });
                    $scope.property.valor = data.filter(function (d) {
                        return d.caracteristica.id_carac == 161
                    });
                    $scope.property.estado = data.filter(function (d) {
                        return d.caracteristica.id_carac == 42
                    });
                    $scope.property.desc = data.filter(function (d) {
                        return d.caracteristica.id_carac == 255
                    });
                    $scope.property.fichaweb = data.filter(function (d) {
                        return d.caracteristica.id_carac == 257
                    });
                    //console.log($scope.property);
                }

                function setMap(data) {
                    if (data && data.goglat && data.goglong && (data.ubicacion || data.nomedif)) {
                        $scope.map.center = {latitude: data.goglat, longitude: data.goglong};
                        var title = (data.ubicacion && data.ubicacion.nombre_completo) ? data.ubicacion.nombre_completo : data.nomedif;
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

                function checkPl(property) {
                    if((property.plano1 && property.plano2) || (property.plano1 && property.plano3)
                    || (property.plano3 && property.plano2)){
                        $scope.showPl = true;
                    }
                }

                $scope.getParam = function () {
                    //console.log($routeParams);
                    $scope.param = $routeParams.id;
                };
                $scope.getData = function () {
                    $scope.getParam();
                    searchApiService.searchApi.readById($scope.param)
                        .then(function (response) {
                            //console.log(response);
                            $scope.property = response.data;
                            setMap($scope.property);
                            setChar($scope.property.propiedad_caracteristicas);
                            checkPl($scope.property);
                            $rootScope.$broadcast('changeTitle', { title: 'Okeefe > Propiedad > '+ ($scope.property.titulo[0].contenido || $scope.property.ubica[0].valor) });
                            $scope.pdf();
                            $timeout(function () {
                                entitiesService.wowSlider();
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
                            //console.log("sug",response);
                            $scope.properties = response.data;
                        });
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
