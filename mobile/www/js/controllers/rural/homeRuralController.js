angular.module('starter.controllers')
  .controller('homeRuralController', function ($scope, $state, $filter, $ionicSlideBoxDelegate, $ionicModal, entitiesService, searchApiService, $ionicSideMenuDelegate) {
    $scope.next = function () {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function () {
      $ionicSlideBoxDelegate.previous();
    };
    $scope.property = null;
    $scope.operation = null;
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.selectProperty = function (prop) {
      console.log(prop);
      $scope.searchParam.tipo = prop;
      $scope.searchParam.property = entitiesService.getTipoInmueble(prop);
      $scope.searchParam.zona = '';
      $scope.loc = '';
      $scope.propertyModal.hide();
    };

    $scope.resetForm = function () {
      $scope.searchParam = {
        empr: '0',
        zona: '',
        oper: 'Compra',
        property: 'Rural',
        tipo: '7,16,6',
        error: false
      };
    };
    $scope.resetForm();
    $scope.validateOper = function () {
      $scope.searchParam.empr = 0;
      $scope.searchParam.zona = '';
      $scope.loc = '';
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
        return searchApiService.searchApi.readLocations($scope.searchParam.oper, $scope.searchParam.tipo, val, '', true).then(function (response) {
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
        window.location = '#!/rural/propiedades/' + $scope.searchParam.property + '/' + $scope.searchParam.oper + '/' + $scope.searchParam.zona;
      }
    };


    $ionicModal.fromTemplateUrl('templates/rural/modal/selectPropertyModal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.propertyModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/rural/modal/selectOperationModal.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.operationModal = modal;
    });

    $scope.selectOperation = function (u) {
      $scope.searchParam.oper = u;
      $scope.operationModal.hide();
    };
  })
