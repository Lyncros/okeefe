angular.module('starter.controllers')
  .controller('menuController', function ($scope, $rootScope, $auth, entitiesService, $ionicSideMenuDelegate) {
    $scope.propertyName = 'valor[0].contenido';
    $scope.isLogged = $auth.isAuthenticated();
    $scope.tabs = {
      'ubi': {show: false},
      'amb': {show: false},
      'coch': {show: false},
      'banos': {show: false},
      'ant': {show: false},
      'bar': {show: false},
      'pre': {show: false},
      'sup': {show: false},
    };
    $scope.apply = function (filter, valMin, valMax) {
      if (filter == 'precio' && (valMin || valMax)) {
        $scope.valMin = valMin || '';
        $scope.valMax = valMax || '';
      } else if (filter == 'sup' && (valMin || valMax)) {
        $scope.supMin = valMin || '';
        $scope.supMax = valMax || '';
      }
      $scope.addFilter(filter);
    };
    $scope.filterProperties = true;
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        $scope.filterProperties = toState.name == 'app.properties';
      });
    $scope.toggleGroup = function (group) {
      $scope.tabs[group].show = !$scope.tabs[group].show;
    };
    $scope.isGroupShown = function (group) {
      return $scope.tabs[group].show;
    };
    $scope.setFilterData = function (data) {
      $scope.filters = data;
    };
    $scope.setAppliedFilterData = function (data) {
      $scope.appliedFilters = data;
    };
    $scope.setChildFiltersData = function (data) {
      $scope.childFilters = data;
    };
    $scope.setAppliedFilterListData = function (data) {
      $scope.appliedFilterslist = data;
    };
    $scope.setSearchData = function (data) {
      $scope.searchData = data;
    };
    $scope.setParamData = function (data) {
      $scope.param = data;
    };

    $scope.filters = {amb: {}, coch: {}, ant: {}, banos: {}, localidad: [], barrio: []};
    $scope.appliedFilterslist = [];
    $scope.getObjectSize = function (obj, type) {
      return entitiesService.objectSize(obj, type);
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

    function ubicationFilter(data) {
      //console.log("data", data);
      angular.forEach(data.child_ubication, function (ubic, key) {
        //console.log(ubic.nombre_ubicacion);
        $scope.childFilters.push({
          key: ubic.id_ubica,
          value: data.nombre_ubicacion + ' | ' + ubic.nombre_ubicacion,
          count: (ubic.properties) ? ubic.properties.length : 0,
          show: true,
          padre: data.id_ubica
        });
      });
    }

    $scope.changeOrder = function (order) {
      $scope.propertyName = order;
    };

    $scope.addFilter = function (filter, value, applied) {
      if (applied && value) {
        var fil = {key: filter, value: value};
        return $scope.removeFilter(fil);
      }
      $scope.appliedFilters[filter] = ($scope.appliedFilters[filter] || []);
      if (filter == 'precio') {
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
      } else {
        $scope.appliedFilters[filter].push(value);
      }
      if (filter == 'localidad') {
        $scope.filters['localidad'][value.index].show = false;
        ubicationFilter($scope.searchData.child_ubication[value.index]);
      }
      if (filter == 'barrio') {
        $scope.childFilters[value.index].show = false;
      }
      return window.location = entitiesService.applyFilter(filter, $scope.appliedFilters, $scope.param.tipo, $scope.param.oper, $scope.param.ubicacion, $scope.param.emp);
    };

    $scope.removeFilter = function (filter) {
      if (filter.key == 'precio' || filter.key == 'sup') {
        $scope.appliedFilters[filter.key] = [];
      } else {
        var index = $scope.appliedFilters[filter.key].indexOf(filter.value);
        $scope.appliedFilters[filter.key].splice(index, 1);
      }
      if (filter.key == 'barrio') {
        $scope.childFilters[filter.value.index].show = true;
      }
      if (filter.key == 'localidad') {
        $scope.filters['localidad'][filter.value.index].show = true;
        resetChildUbic(filter.value.key);
      }
      return window.location = entitiesService.applyFilter(filter, $scope.appliedFilters, $scope.param.tipo, $scope.param.oper, $scope.param.ubicacion, $scope.param.emp);
    };

    function deleteChildByVal(val) {
      for (var key in $scope.appliedFilters.barrio) {
        if ($scope.appliedFilters.barrio[key].key == val) $scope.appliedFilters.barrio.splice(key, 1);
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
  });

