angular.module('starter.controllers')
  .controller('propertiesRuralController', function ($scope, $ionicPopup, $timeout, $rootScope, entitiesService, $stateParams, favoritesService,
                                                     searchApiService, defaultFactory, $auth, $location, SITE_URL, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.map = defaultFactory.property_map;
    $scope.options = defaultFactory.options;
    $scope.childFilters = [];
    $scope.control = {};
    $scope.refreshMap = function () {
      entitiesService.refreshMap($scope);
    };
    $scope.trustAsHtml = function (html) {
      return entitiesService.trustHtml(html);
    };

    $scope.showPopup = function (prop) {
      $scope.shareProp = prop;
      $scope.shareProp.siteUrl = SITE_URL;
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

    $scope.tabs = {
      'ubi': {show: false},
      'amb': {show: false},
      'map': {show: false},
      'plan': {show: false},
    };
    $scope.toggleGroup = function (group) {
      $scope.tabs[group].show = !$scope.tabs[group].show;
    };
    $scope.isGroupShown = function (group) {
      return $scope.tabs[group].show;
    };
    $scope.view = 'list';
    $scope.init = function () {
      $scope.filters = {amb: {}, coch: {}, ant: {}, banos: {}, localidad: [], barrio: [], aptitud: {}};
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
      $scope.setParamData($scope.param);
      $scope.appliedFilterslist = [];
    };

    function findIndexKeyWithAttr(array, attr, value) {
      var data = [];
      angular.forEach(array, function (v, k) {
        if (v.value == value) {
          data[0] = v.key;
          data[1] = k;
          v.show = false;
          return data;
        }
      });
      return data;
    }

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
      property['aptitud'] = property.propiedad_caracteristicas.filter(function (item) {
        return item.id_carac == 303;
      });
      return property;
    }

    function getFilters(property) {
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
      $scope.setFilterData($scope.filters);
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

    function getAppliedFilter() {
      $scope.appliedFilters = {
        amb: ($scope.param.amb) ? $scope.param.amb.split(',') : [],
        coch: ($scope.param.coch) ? $scope.param.coch.split(',') : [],
        ant: ($scope.param.ant) ? $scope.param.ant.split(',') : [],
        banos: ($scope.param.banos) ? $scope.param.banos.split(',') : [],
        aptitud: ($scope.param.aptitud) ? $scope.param.aptitud.split(',') : [],
      };
      if ($scope.param.precio) {
        var prec = $scope.param.precio.split(',');
        $scope.appliedFilters['precio'] = [];
        $scope.appliedFilters['precio'].push({key: 'valMin', value: prec[0]});
        $scope.appliedFilters['precio'].push({key: 'valMax', value: prec[1]});
      }
      if ($scope.param.sup) {
        var su = $scope.param.sup.split(',');
        $scope.appliedFilters['sup'] = [];
        $scope.appliedFilters['sup'].push({key: 'supMin', value: su[0]});
        $scope.appliedFilters['sup'].push({key: 'supMax', value: su[1]});
      }
      $scope.appliedFilters['localidad'] = [];
      if ($scope.param.localidad) {
        var pro = $scope.param.localidad.split(',');
        angular.forEach(pro, function (value, key) {
          value = value.replace("-", " ").split('-').join(' ');
          var data = findIndexKeyWithAttr($scope.filters.localidad, 'value', value);
          ubicationFilter($scope.searchData.child_ubication[data[1]], true);
          $scope.appliedFilters['localidad'].push({key: data[0], value: value, index: data[1]});

        });
      }
      $scope.appliedFilters['barrio'] = [];
      if ($scope.param.barrio) {
        var pro = $scope.param.barrio.split(',');
        angular.forEach(pro, function (value, key) {
          value = value.replace("-", " ").split('-').join(' ');
          var data = findIndexKeyWithAttr($scope.childFilters, 'value', value);
          $scope.appliedFilters['barrio'].push({key: data[0], value: value, index: data[1]});

        });
      }
      angular.forEach($scope.appliedFilters, function (value, key) {
        if (value.length) {
          if (key == 'precio') {
            $scope.appliedFilterslist.push({key: 'valMin', value: parseInt(value[0].value)});
            $scope.appliedFilterslist.push({key: 'valMax', value: parseInt(value[1].value)});
          } else if (key == 'sup') {
            $scope.appliedFilterslist.push({key: 'supMin', value: parseInt(value[0].value)});
            $scope.appliedFilterslist.push({key: 'supMax', value: parseInt(value[1].value)});
          } else {
            angular.forEach(value, function (v, k) {
              $scope.appliedFilterslist.push({key: key, value: v});
            });
          }
        }
      });
      $scope.setAppliedFilterListData($scope.appliedFilterslist);
      $scope.setAppliedFilterData($scope.appliedFilters);
      $scope.setChildFiltersData($scope.childFilters);
    }

    $scope.$watch('appliedFilters', function () {
      $scope.properties.forEach(function (property) {
        if($scope.verFiltrado(property)){
          getFilters(property);
        }
      });
    });

    function getPropCount(data) {
      var count = (data.properties) ? data.properties.length : 0;
      angular.forEach(data.child_ubication, function (ubic, key) {
        count += (ubic.properties) ? ubic.properties.length : 0;
      });
      return count;
    }

    function ubicationFilter(data, child) {
      if (child) {
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
        $scope.setChildFiltersData($scope.childFilters);
      } else {
        angular.forEach(data.child_ubication, function (ubic, keyP) {
          //console.log(ubic.nombre_ubicacion);
          $scope.filters['localidad'].push({
            key: ubic.id_ubica,
            value: ubic.nombre_ubicacion,
            count: getPropCount(ubic),
            show: true
          });
        });
        $scope.setFilterData($scope.filters);
      }
    }

    $scope.getData = function () {
      $scope.getParam();
      $scope.properties = [];
      searchApiService.searchApi.read($stateParams.tipo, $stateParams.operacion, $stateParams.ubicacion, $scope.param)
        .then(function (response) {
          //console.log("res", response.data.data);
          //$scope.properties = response.data.data[0].properties;
          $scope.searchData = response.data.data[0];
          //$scope.loadingProperties = false;
          if ($scope.searchData) {
            $scope.setSearchData($scope.searchData);
            totalProperties($scope.searchData, $scope.searchData.id_ubica);
            ubicationFilter($scope.searchData);
            getAppliedFilter();
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
    $scope.filtrarPropiedades = function (item, idx, all) {
      //console.log("appliedFilters.ubi", $scope.appliedFilters.ubi);
      var filters = $scope.appliedFilters;
      //console.log("filters", filters);
      var applied = false;
      var results = {};
      var matches = true;

      for (var key in filters) {
        var values = filters[key];
        if (values.length && key != 'precio' && key != 'sup') {
          applied = true;
          matches = false;
        } else if (values.length && (key == 'precio' || key == 'sup') && (values[0] && values[0].value != "null" || values[1] && values[1].value != "null")) {
          applied = true;
          matches = false;
        }
        switch (key) {
          case 'localidad':
            /*console.log(item.padres);
             console.log(values);*/
            if (item.padres && values.length) {
              values.forEach(function (val) {
                //console.log("val", val);
                if (item.padres.indexOf(val.key) != -1 || item.id_ubica == val.key) {
                  matches = true;
                  //console.log("contain");
                }
              });
            }
            break;
          case 'barrio':
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
          case 'aptitud':
            if (item.aptitud[0] && values.indexOf(item.aptitud[0].contenido) != -1) {
              matches = true;
            }
            break;
          case 'precio':
            if (item.valor.length && values[0] && values[0].value != "" && values[1] && values[1].value != "") {
              if (parseFloat(item.valor[0].contenido) >= parseFloat(values[0].value)
                && parseFloat(item.valor[0].contenido) <= parseFloat(values[1].value)) {
                matches = true;
              }
            } else if (item.valor.length && values[0] && values[0].value != ""
              && parseFloat(item.valor[0].contenido) >= parseFloat(values[0].value)) {
              matches = true;
            } else if (item.valor.length && values[1] && values[1].value != ""
              && parseFloat(item.valor[0].contenido) <= parseFloat(values[1].value)) {
              matches = true;
            }
            break;
          case 'sup':
            if (item.sup_total.length && values[0] && values[0].value != "" && values[1] && values[1].value != "") {
              if (parseFloat(item.sup_total[0].contenido) >= parseFloat(values[0].value)
                && parseFloat(item.sup_total[0].contenido) <= parseFloat(values[1].value)) {
                matches = true;
              }
            } else if (item.sup_total.length && values[0] && values[0].value != ""
              && parseFloat(item.sup_total[0].contenido) >= parseFloat(values[0].value)) {
              matches = true;
            } else if (item.sup_total.length && values[1] && values[1].value != ""
              && parseFloat(item.sup_total[0].contenido) <= parseFloat(values[1].value)) {
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

    $scope.verFiltrado = function (item) {
      //console.log("appliedFilters.ubi", $scope.appliedFilters.ubi);
      var filters = $scope.appliedFilters;
      var applied = false;
      var matches = true;

      for (var key in filters) {
        var values = filters[key];
        if (values.length && key != 'precio' && key != 'sup') {
          applied = true;
          matches = false;
        } else if (values.length && (key == 'precio' || key == 'sup') && (values[0] && values[0].value != "null" || values[1] && values[1].value != "null")) {
          applied = true;
          matches = false;
        }
        switch (key) {
          case 'localidad':
            /*console.log(item.padres);
             console.log(values);*/
            if (item.padres && values.length) {
              values.forEach(function (val) {
                //console.log("val", val);
                if (item.padres.indexOf(val.key) != -1 || item.id_ubica == val.key) {
                  matches = true;
                  //console.log("contain");
                }
              });
            }
            break;
          case 'barrio':
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
          case 'precio':
            if (item.valor.length && values[0] && values[0].value != "" && values[1] && values[1].value != "") {
              if (parseFloat(item.valor[0].contenido) >= parseFloat(values[0].value)
                && parseFloat(item.valor[0].contenido) <= parseFloat(values[1].value)) {
                matches = true;
              }
            } else if (item.valor.length && values[0] && values[0].value != ""
              && parseFloat(item.valor[0].contenido) >= parseFloat(values[0].value)) {
              matches = true;
            } else if (item.valor.length && values[1] && values[1].value != ""
              && parseFloat(item.valor[0].contenido) <= parseFloat(values[1].value)) {
              matches = true;
            }
            break;
          case 'sup':
            if (item.sup_total.length && values[0] && values[0].value != "" && values[1] && values[1].value != "") {
              if (parseFloat(item.sup_total[0].contenido) >= parseFloat(values[0].value)
                && parseFloat(item.sup_total[0].contenido) <= parseFloat(values[1].value)) {
                matches = true;
              }
            } else if (item.sup_total.length && values[0] && values[0].value != ""
              && parseFloat(item.sup_total[0].contenido) >= parseFloat(values[0].value)) {
              matches = true;
            } else if (item.sup_total.length && values[1] && values[1].value != ""
              && parseFloat(item.sup_total[0].contenido) <= parseFloat(values[1].value)) {
              matches = true;
            }
            break;
        }
      }

      if (!applied || (applied && matches)) {
        return true;
      } else {
        // nada matchea.
        return false;
      }

    };


    $scope.init();

  });
