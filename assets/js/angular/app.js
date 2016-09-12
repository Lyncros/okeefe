(function () {
    var app = angular.module('okeefeSite', [
        'uiGmapgoogle-maps',
        'ngAnimate',
        'ui.bootstrap',
        'ngSanitize',
        'ngRoute',
        'okeefeSite.services',
        'okeefeSite.controllers',
        'okeefeSite.constants',
        'satellizer',
        'toastr',
        'ui.gravatar',
        'frapontillo.bootstrap-switch',
        'fancyboxplus'
    ]);

    app.config(function ($httpProvider, $routeProvider, uiGmapGoogleMapApiProvider, $locationProvider, $authProvider, API_CLIENT_AUTH) {
        

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDMSy5R0Rfyx7rnhJ50sBUsHawncc87tJo',
            v: '3',
            libraries: 'weather,geometry,visualization'
        });

        // $locationProvider.html5Mode(true);

        /**
         * Helper auth functions
         */
        var skipIfLoggedIn = function ($q, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        };

        var loginRequired = function ($q, $location, $auth, $uibModalInstance) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('login');
            }
            return deferred.promise;
        };

        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'homeController',
                activetab: 'home'
            })
            .when('/inicio', {
                templateUrl: 'templates/home.html',
                controller: 'homeController',
                activetab: 'home'
            })
            .when('/inversiones', {
                templateUrl: 'templates/investments.html',
                controller: 'investmentsController',
                activetab: 'inversiones'
            })
            .when('/tasaciones', {
                templateUrl: 'templates/appraisals.html',
                controller: 'appraisalsController',
                activetab: 'tasaciones'
            })
            .when('/noticias', {
                templateUrl: 'templates/news.html',
                controller: 'newsController',
                activetab: 'noticias'
            })
            .when('/propiedades/:tipo/:operacion', {
                templateUrl: 'templates/properties.html',
                controller: 'propertiesController',
                activetab: 'propiedades',
                reloadOnSearch: false
            })
            .when('/ficha-propiedad/:id', {
                templateUrl: 'templates/property-sheet.html',
                controller: 'propertySheetController',
                activetab: 'ficha-propiedad'
            })
            .when('/ficha-emprendimiento', {
                templateUrl: 'templates/venture-sheet.html',
                controller: 'ventureSheetController',
                activetab: 'ficha-emprendimiento'
            })
            .when('/quienes-somos', {
                templateUrl: 'templates/about.html',
                controller: 'aboutController',
                activetab: 'quienes-somos'
            })
            .when('/empleo', {
                templateUrl: 'templates/work-with-us.html',
                controller: 'workWithUsController',
                activetab: 'empleo'
            })
            .when('/recordar-clave', {
                templateUrl: 'templates/reset-pw.html',
                controller: 'resetController'
            })
            .otherwise("/");

        $authProvider.loginUrl = API_CLIENT_AUTH + 'login';

        $authProvider.facebook({
            url: API_CLIENT_AUTH + 'auth/facebook',
            clientId: '1732340417017180'
        });

        $authProvider.google({
            url: API_CLIENT_AUTH + 'auth/google',
            clientId: '161677011925-t4907vrogdtgjkg0u52g8rhciacj1gv2.apps.googleusercontent.com'
        });
    });

})();
