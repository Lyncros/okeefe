(function(){
    var app = angular.module('okeefeRuralSite', [
        'uiGmapgoogle-maps',
        'ngAnimate',
        'ui.bootstrap',
        'ngSanitize',
        'ngRoute',
        'okeefeRuralSite.services',
        'okeefeRuralSite.controllers',
        'okeefeRuralSite.constants',
        'satellizer',
        'toastr',
        'ui.gravatar',
        'frapontillo.bootstrap-switch',
        'fancyboxplus',
        '720kb.socialshare',
        'vcRecaptcha',
        'bootstrap.fileField'
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
                templateUrl: '../templates/rural/home.html',
                controller: 'homeController',
                activetab: 'inicio'
            })
            .when('/inicio', {
                templateUrl: '../templates/rural/home.html',
                controller: 'homeController',
                activetab: 'inicio'
            })
            .when('/tasaciones', {
                templateUrl: '../templates/rural/appraisals.html',
                controller: 'appraisalsController',
                activetab: 'tasaciones'
            })
            .when('/servicios', {
                templateUrl: '../templates/rural/services.html',
                controller: 'servicesController',
                activetab: 'servicios'
            })
            .when('/noticias', {
                templateUrl: '../templates/rural/news.html',
                controller: 'newsController',
                activetab: 'noticias'
            })
            .when('/propiedades/:tipo/:operacion/:ubicacion', {
                templateUrl: '../templates/rural/properties.html',
                controller: 'propertiesController',
                activetab: 'propiedades',
                reloadOnSearch: false
            })
            .when('/ficha-propiedad/:id', {
                templateUrl: '../templates/rural/property-sheet.html',
                controller: 'propertySheetController',
                activetab: 'ficha-propiedad'
            })
            .when('/quienes-somos', {
                templateUrl: '../templates/rural/about.html',
                controller: 'aboutController',
                activetab: 'quienes-somos'
            })
            .when('/empleo', {
                templateUrl: '../templates/rural/work-with-us.html',
                controller: 'workWithUsController',
                activetab: 'empleo'
            })
            .when('/arrendamientos', {
                templateUrl: '../templates/rural/leases.html',
                activetab: 'arrendamientos'
            })
            .when('/subdivisiones', {
                templateUrl: '../templates/rural/subdivisions.html',
                activetab: 'subdivisiones'
            })
            .otherwise("/");
    });
})();