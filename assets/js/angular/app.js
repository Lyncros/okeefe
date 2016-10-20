(function () {
    var app = angular.module('okeefeSite', [
        'uiGmapgoogle-maps',
        'ngAnimate',
        'ui.bootstrap',
        'ngSanitize',
        'ngRoute',
        'okeefeSite.services',
        'okeefeSite.directives',
        'okeefeSite.controllers',
        'okeefeRuralSite.services',
        'okeefeRuralSite.controllers',
        'okeefeSite.constants',
        'satellizer',
        'toastr',
        'ui.gravatar',
        'frapontillo.bootstrap-switch',
        'fancyboxplus',
        '720kb.socialshare',
        'vcRecaptcha',
        'bootstrap.fileField'
    ]);

    app.config(function ($httpProvider, $routeProvider, uiGmapGoogleMapApiProvider, $locationProvider, $compileProvider, $authProvider, API_CLIENT_AUTH) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDMSy5R0Rfyx7rnhJ50sBUsHawncc87tJo',
            v: '3',
            libraries: 'weather,geometry,visualization'
        });
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|blob):/);

        // $locationProvider.html5Mode(true);

        $locationProvider.hashPrefix('!');
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
                activetab: 'home',
                site: 'urbano'
            })
            .when('/inicio', {
                templateUrl: 'templates/home.html',
                controller: 'homeController',
                activetab: 'home',
                site: 'urbano'
            })
            .when('/inversiones', {
                templateUrl: 'templates/investments.html',
                controller: 'investmentsController',
                activetab: 'inversiones',
                site: 'urbano'
            })
            .when('/tasaciones', {
                templateUrl: 'templates/appraisals.html',
                controller: 'appraisalsController',
                activetab: 'tasaciones',
                site: 'urbano'
            })
            .when('/noticias', {
                templateUrl: 'templates/news.html',
                controller: 'newsController',
                activetab: 'noticias',
                site: 'urbano'
            })
            .when('/propiedades/:tipo/:operacion/:ubicacion', {
                templateUrl: 'templates/properties.html',
                controller: 'propertiesController',
                activetab: 'propiedades',
                site: 'urbano',
                reloadOnSearch: false
            })
            .when('/ficha-propiedad/:id', {
                templateUrl: 'templates/property-sheet.html',
                controller: 'propertySheetController',
                activetab: 'ficha-propiedad',
                site: 'urbano'
            })
            .when('/ficha-emprendimiento/:id', {
                templateUrl: 'templates/venture-sheet.html',
                controller: 'ventureSheetController',
                activetab: 'ficha-emprendimiento',
                site: 'urbano'
            })
            .when('/quienes-somos', {
                templateUrl: 'templates/about.html',
                controller: 'aboutController',
                activetab: 'quienes-somos',
                site: 'urbano'
            })
            .when('/empleo', {
                templateUrl: 'templates/work-with-us.html',
                controller: 'workWithUsController',
                activetab: 'empleo',
                site: 'urbano'
            })
            .when('/recordar-clave', {
                templateUrl: 'templates/reset-pw.html',
                controller: 'resetController',
                site: 'urbano'
            })
            .when('/rural', {
                templateUrl: 'templates/rural/home.html',
                controller: 'homeRuralController',
                activetab: 'inicio',
                site: 'rural'
            })
            .when('/rural/inicio', {
                templateUrl: 'templates/rural/home.html',
                controller: 'homeRuralController',
                activetab: 'inicio',
                site: 'rural'
            })
            .when('/rural/tasaciones', {
                templateUrl: 'templates/rural/appraisals.html',
                controller: 'appraisalsRuralController',
                activetab: 'tasaciones',
                site: 'rural'
            })
            .when('/rural/servicios', {
                templateUrl: 'templates/rural/services.html',
                controller: 'servicesRuralController',
                activetab: 'servicios',
                site: 'rural'
            })
            .when('/rural/noticias', {
                templateUrl: 'templates/rural/news.html',
                controller: 'newsRuralController',
                activetab: 'noticias',
                site: 'rural'
            })
            .when('/rural/propiedades/:tipo/:operacion/:ubicacion', {
                templateUrl: 'templates/rural/properties.html',
                controller: 'propertiesRuralController',
                activetab: 'propiedades',
                site: 'rural',
                reloadOnSearch: false
            })
            .when('/rural/ficha-propiedad/:id', {
                templateUrl: 'templates/rural/property-sheet.html',
                controller: 'propertySheetRuralController',
                activetab: 'ficha-propiedad',
                site: 'rural'
            })
            .when('/rural/quienes-somos', {
                templateUrl: 'templates/rural/about.html',
                controller: 'aboutRuralController',
                activetab: 'quienes-somos',
                site: 'rural'
            })
            .when('/rural/empleo', {
                templateUrl: 'templates/rural/work-with-us.html',
                controller: 'workWithUsRuralController',
                activetab: 'empleo',
                site: 'rural'
            })
            .when('/rural/arrendamientos', {
                templateUrl: 'templates/rural/leases.html',
                activetab: 'arrendamientos',
                site: 'rural'
            })
            .when('/rural/subdivisiones', {
                templateUrl: 'templates/rural/subdivisions.html',
                activetab: 'subdivisiones',
                site: 'rural'
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
