angular.module('starter.controllers')
  .controller('propertySheetController',
    function ($scope, defaultFactory, $ionicSlideBoxDelegate, okeefeApiService, entitiesService, searchApiService, $stateParams) {
    $scope.control = {};
    $scope.resultFav = false;
    $scope.favCount = 0;
    $scope.pdfFile = '';
    $scope.showPl = false;
    $scope.tabs = {
      'des' : {show : false},
      'vid' : {show : false},
      'map' : {show : false},
      'plan' : {show : false},
      'res' : {show : false},
      'car' : {show : false},
      'amb' : {show : false},
      'ser' : {show : false},
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

    $scope.init = function () {
      //$scope.isLogged = $auth.isAuthenticated();
      $scope.map = {
        center: {},
        control: {},
        markers: []
      };
      $scope.getData();
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
      $scope.property.sup_total = data.filter(function (d) {
        return d.caracteristica.id_carac == 198
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
      if ((property.plano1 && property.plano2) || (property.plano1 && property.plano3)
        || (property.plano3 && property.plano2)) {
        $scope.showPl = true;
      }
    }

    $scope.getParam = function () {
      //console.log($stateParams);
      $scope.param = $stateParams.id;
    };
    $scope.getData = function () {
      $scope.getParam();
      searchApiService.searchApi.readById($scope.param)
        .then(function (response) {
          $scope.property = response.data;
          console.log($scope.property);
          setMap($scope.property);
          setChar($scope.property.propiedad_caracteristicas);
          checkPl($scope.property);
          return response.data;
        })
    };
    $scope.refreshMap = function () {
      entitiesService.refreshMap($scope);
    };
    $scope.toggleGroup = function (group) {
      $scope.tabs[group].show = !$scope.tabs[group].show;
    };
    $scope.sliderOptions = {
      loop: false,
      effect: 'fade',
      speed: 500,
      onInit: function(swiper)
      {
        $scope.initSlider = swiper;
      },
    };
    $scope.isGroupShown = function (group) {
      return $scope.tabs[group].show;
    };
    $scope.trustSrc = function (src) {
      return entitiesService.trustSrc(src);
    };
    $scope.init();
  });
