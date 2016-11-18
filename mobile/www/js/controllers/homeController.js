angular.module('starter.controllers', [])
  .controller('homeController', function ($scope, $state, $filter, $ionicSlideBoxDelegate, $ionicModal, entitiesService, searchApiService, $ionicSideMenuDelegate) {
    $scope.next = function () {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function () {
      $ionicSlideBoxDelegate.previous();
    };
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.property = null;
    $scope.operation = null;

    $scope.selectProperty = function (prop) {
      $scope.searchParam.tipo = prop;
      $scope.searchParam.property = entitiesService.getTipoInmueble(prop);
      $scope.searchParam.zona = '';
      $scope.loc = '';
      $scope.propertyModal.hide();
    };

    $scope.resetForm = function () {
      $scope.searchParam = {
        empr: false,
        zona: '',
        oper: 'Compra',
        property: 'Residencial',
        tipo: '9,1,7,17',
        error: false
      };
    };
    $scope.resetForm();
    $scope.validateOper = function () {
      $scope.searchParam.empr = 0;
      $scope.searchParam.zona = '';
      $scope.loc = '';
      if ($scope.searchParam.oper == 'Venta')
        window.location = '#!/tasaciones/';
    };
    $scope.validateForm = function () {
      if (!$scope.searchParam.property || !$scope.searchParam.oper || !$scope.searchParam.zona) {
        $scope.searchParam.error = true;
        return false;
      }
      return true;
    };
    $scope.getLocation = function (val) {
      if (val.length > 2) {
        var emp = ($scope.searchParam.empr) ? 1 : 0;
        return searchApiService.searchApi.readLocations($scope.searchParam.oper, $scope.searchParam.tipo, val, emp).then(function (response) {
          $scope.result = $filter('orderBy')(response.data.data, 'total', true);
          return {
            items: $scope.result.map(function (item) {
              return {
                id: item.id_ubica,
                name: item.nombre_completo,
                view: item.nombre_completo + " (" + item.total + ")"
              };
            })
          };
        }, function errorCallback(response) {
          console.log("error :", response);
        });
      }
      if ($scope.result) {
        return {
          items: $scope.result.map(function (item) {
            return {
              id: item.id_ubica,
              name: item.nombre_completo,
              view: item.nombre_completo + " (" + item.total + ")"
            };
          })
        };
      }
      return {items: []};
    };

    $scope.selectedZone = function (callback) {
      $scope.searchParam.zona = callback.item.id;
    };
    $scope.searchProp = function () {
      if ($scope.validateForm()) {
        window.location = '#!/app/propiedades/' + $scope.searchParam.property + '/' + $scope.searchParam.oper + '/' + $scope.searchParam.zona + '?emp=' + ($scope.searchParam.empr || 0);
      }
    };


    $ionicModal.fromTemplateUrl('templates/modal/selectPropertyModal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.propertyModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modal/selectOperationModal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.operationModal = modal;
    });

    $scope.selectOperation = function (u) {
      if (u == 'Venta') {
        window.location = '#!/app/tasaciones';
      }
      $scope.searchParam.oper = u;
      $scope.operationModal.hide();
    };
  })
