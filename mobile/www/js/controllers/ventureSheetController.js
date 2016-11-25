angular.module('starter.controllers')
  .controller('ventureSheetController',
    function ($scope,SITE_URL, defaultFactory, $ionicSideMenuDelegate,$auth,$ionicPopup, favoritesService, okeefeApiService, entitiesService, searchApiService, $stateParams) {
      $scope.siteUrl = SITE_URL;
      $scope.resultFav = false;
      $scope.favCount = 0;
      $ionicSideMenuDelegate.canDragContent(false);
      $scope.isLogged = $auth.isAuthenticated();
      $scope.tabs = {
        'des': {show: true},
        'vid': {show: true},
        'map': {show: true},
        'plan': {show: true},
        'res': {show: true},
        'car': {show: true},
        'amb': {show: true},
        'ser': {show: true},
      };
      $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
      $scope.psForm = function ($event) {
        $event.preventDefault();
        if (!$scope.psContactForm.nombre || !$scope.psContactForm.apellido || !$scope.psContactForm.email || !$scope.psContactForm.telefono || !$scope.psContactForm.celular || !$scope.psContactForm.comentarios) {
          $scope.psContactForm.error = true;
          return false;
        }
        $scope.psContactForm.comentarios = "Propiedad (" + $stateParams.id + ") - " + $scope.psContactForm.comentarios;
        okeefeApiService.API.send($scope.psContactForm).then(function (response) {
          entitiesService.showAlert($scope, 'Mensaje enviado. Estaremos en contacto en breve.', 'success', 3000);
          $scope.psContactForm = {secret: 'sitiOkeefe', dato: '', error: false};
        }, function errorCallback(response) {
          entitiesService.showAlert($scope, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', 'danger', 3000);
          console.log("error :", response);
        });
      };


      $scope.getTipoOperacion = function (val) {
        return entitiesService.getTipoOperacion(val);
      };

      $scope.init = function () {
        $scope.map = {
          center: {},
          control: {},
          markers: []
        };
        $scope.getData();
      };

      if ($scope.isLogged) {
        favoritesService.count()
          .then(function (data) {
            $scope.favCount = data;
          });
      }

      $scope.doFav = function (id) {
        if ($scope.isLogged) {
          favoritesService.setFavorite(id)
            .then(function () {
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
                });
              favoritesService.count()
                .then(function (data) {
                  $scope.favCount = data;
                });
            });
        } else {
          return window.location = '#!/auth/login?url=' + window.location.hash;
        }
      };

      $scope.showPopup = function (prop) {
        $scope.shareProp = prop;
        $scope.data = {};
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          templateUrl: 'templates/modal/share.html',
          title: 'Compartir',
          scope: $scope,
          buttons: [
            {
              text: 'Cancelar',
              type: 'button-positive',
              onTap: function (e) {
                myPopup.close();
              }
            },
          ]
        });

        myPopup.then(function (res) {
          //console.log('Tapped!', res);
          //myPopup.close();
        });
      };
      function setPropChar(data) {
        angular.forEach(data.properties, function (value, key) {
          value.operacion = $scope.getTipoOperacion(value.id_tipo_prop);
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
        if (data && data.goglat && data.goglong && (data.ubicacion || data.comentario)) {
          $scope.map.center = {latitude: data.goglat, longitude: data.goglong};
          var title = (data.ubicacion) ? data.ubicacion : data.comentario;
          $scope.map.markers.push(
            {
              id: data.id_emp,
              coords: {latitude: data.goglat, longitude: data.goglong},
              options: {
                title: title
              }
            })
        }
      }

      $scope.getParam = function () {
        //console.log($routeParams);
        $scope.param = $stateParams.id;
      };

      function setData(response) {
        $scope.property = response.data;
        setMap($scope.property);
        setPropChar($scope.property);
        setChar($scope.property.caracteristicas);
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
      $scope.refreshMap = function () {
        entitiesService.refreshMap($scope);
      };
      $scope.toggleGroup = function (group) {
        $scope.tabs[group].show = !$scope.tabs[group].show;
      };
      $scope.isGroupShown = function (group) {
        return $scope.tabs[group].show;
      };
      $scope.trustSrc = function (src) {
        return entitiesService.trustSrc(src);
      };
      $scope.getData = function () {
        $scope.getParam();
        searchApiService.searchApi.readById($stateParams.id, true)
          .then(function (response) {
            setData(response);
          })

      };

      $scope.control = {};

      $scope.trustAsHtml = function (html) {
        return entitiesService.trustHtml(html);
      };


      $scope.init();

    });
