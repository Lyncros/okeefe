(function() {
  angular.module('okeefeSite.controllers')
    .controller('accountController', function($scope, $rootScope, $uibModalInstance, entitiesService) {

      $uibModalInstance.rendered.then(function() {
        entitiesService.tabs();
        entitiesService.switchBox();
        entitiesService.popover();
      });
      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.doLogout = function() {

      }
    })
    .controller('loginController',
      function($scope, $rootScope, $uibModalInstance, $location, entitiesService, $auth) {

        $scope.alert;

        $scope.doLogin = function(email, password) {
          $auth.login({
              'email': email,
              'password': password
            })
            .then(function() {

              $scope.alert = {
                type: 'success',
                'msg': 'Bienvenido a Okeefe'
              };

              setTimeout(function() {
                $uibModalInstance.dismiss('cancel');

                window.location = '/';
              }, 1000);
            })
            .catch(function(error) {
              $scope.alert = {
                type: 'danger',
                'msg': 'Credenciales invalidas'
              };
            });
        };

        $scope.authenticate = function(provider) {

          $auth.authenticate(provider)
            .then(function() {
              $scope.alert = {
                type: 'success',
                'msg': 'Bienvenido a Okeefe'
              };

              $scope.alert = {
                type: 'success',
                'msg': 'Bienvenido a Okeefe'
              };

              setTimeout(function() {
                $uibModalInstance.dismiss('cancel');

                window.location = '/';
              }, 1000);
            })
            .catch(function(error) {
              if (error.error) {
                // Popup error - invalid redirect_uri, pressed cancel button, etc.
                $scope.alert = {
                  type: 'danger',
                  'msg': error.error
                };
              } else if (error.data) {
                // HTTP response error from server
                $scope.alert = {
                  type: 'danger',
                  'msg': error.data.message
                };
              } else {
                $scope.alert = {
                  type: 'danger',
                  'msg': error
                };
              }
            });
        };

        $uibModalInstance.rendered.then(function() {
          entitiesService.switchBox();
        });

        $scope.rememberPw = function() {
          $uibModalInstance.dismiss('cancel');
          $location.path('recordar-clave');
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.register = function() {
          $uibModalInstance.dismiss('cancel');
          $rootScope.$emit('register');
        };

      })
    .controller('resetController', function($scope, userService) {

      $scope.doReset = function(isValid) {

        if (isValid) {
          userService.reset($scope.user.email)
            .then(function() {
              $scope.alert = {
                type: 'success',
                'msg': 'Se reinicio su clave con exito, verifique su email.'
              };

              $scope.email = {};
            })
            .catch(function(error) {
              $scope.alert = {
                type: 'danger',
                'msg': error.data.message,
              };
            });
        }
      }
    })
    .controller('registerController',
      function($scope, $rootScope, $uibModalInstance, entitiesService,
        API_CLIENT_AUTH, $http, $auth, userService) {

        $uibModalInstance.rendered.then(function() {
          entitiesService.switchBox();
        });

        $scope.cancel = function() {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.login = function() {
          $uibModalInstance.dismiss('cancel');
          $rootScope.$emit('login');
        };

        $scope.doRegister = function(isValid) {
          if (isValid) {

            userService.store($scope.user)
              .then(function(response) {
                $scope.alert = {
                  type: 'success',
                  'msg': 'Creado con exito, verifique su correo para obtener su clave.'
                };

                $scope.user = {};
              })
              .catch(function(error) {
                if (error.data.status_code == 422) {
                  $scope.alert = {
                    type: 'danger',
                    'msg': error.data.errors.clave[0],
                  };
                  return false;
                }

                $scope.alert = {
                  type: 'danger',
                  'msg': error.data.error,
                };
              });
          }
        };

        $scope.authenticate = function(provider) {

          $auth.authenticate(provider)
            .then(function() {
              $scope.alert = {
                type: 'success',
                'msg': 'Bienvenido a Okeefe'
              };

              setTimeout(function() {
                $uibModalInstance.dismiss('cancel');

                window.location = '/';
              }, 1000);
            })
            .catch(function(error) {
              if (error.error) {
                // Popup error - invalid redirect_uri, pressed cancel button, etc.
                $scope.alert = {
                  type: 'danger',
                  'msg': error.error
                };
              } else if (error.data) {
                // HTTP response error from server
                $scope.alert = {
                  type: 'danger',
                  'msg': error.data.message
                };
              } else {
                $scope.alert = {
                  type: 'danger',
                  'msg': error
                };
              }
            });
        };
      });
})();
