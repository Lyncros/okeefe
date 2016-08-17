angular.module('starter.controllers')
    .controller('menuController', function ($scope, $rootScope, $auth) {

        $scope.isLogged = $auth.isAuthenticated();

        $scope.filterProperties = true;
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $scope.filterProperties = toState.name == 'app.properties';
            });
        $scope.toggleGroup = function (group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function (group) {
            return group.show;
        };
        $scope.filters = [
            {
                id: 1,
                name: 'Ubicación',
                content: 'contenido'
            },
            {
                id: 1,
                name: 'Tipo de Inmueble',
                content: 'contenido'
            },
            {
                id: 1,
                name: 'Zona',
                content: 'contenido'
            },
            {
                id: 2,
                name: 'Precio',
                currencies: [
                    {
                        name: 'Pesos',
                        content: {
                            min_val: 30000,
                            max_val: 1000000
                        },
                    },
                    {
                        name: 'Dólares',
                        content: {
                            min_val: 30000,
                            max_val: 1000000
                        },
                    }
                ]
            },
            {
                id: 1,
                name: 'Ambiente',
                content: 'contenido'
            },
            {
                id: 1,
                name: 'Cocheras',
                content: 'contenido'
            },
            {
                id: 1,
                name: 'Baños',
                content: 'contenido'
            },
            {
                id: 1,
                name: 'Antigüedad',
                content: 'contenido'
            },
            {
                id: 1,
                name: 'Servicios',
                content: 'contenido'
            },
        ];
    })

