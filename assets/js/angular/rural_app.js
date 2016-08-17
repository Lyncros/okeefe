(function(){
    var app = angular.module('okeefeRuralSite', ['uiGmapgoogle-maps','ngAnimate', 'ui.bootstrap','ngSanitize','ngRoute','okeefeRuralSite.controllers','okeefeRuralSite.services']);
    app.config(function ($httpProvider,$routeProvider,uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDMSy5R0Rfyx7rnhJ50sBUsHawncc87tJo',
            v: '3',
            libraries: 'weather,geometry,visualization'
        });
        $routeProvider
            .when('/', {
                templateUrl: '../templates/rural/home.html',
                controller: 'homeController'
            })
            .when('/inicio', {
                templateUrl: '../templates/rural/home.html',
                controller: 'homeController'
            })
            .when('/tasaciones', {
                templateUrl: '../templates/rural/appraisals.html',
                controller: 'appraisalsController'
            })
            .when('/noticias', {
                templateUrl: '../templates/rural/news.html',
                controller: 'newsController'
            })
            .when('/propiedades', {
                templateUrl: '../templates/rural/properties.html',
                controller: 'propertiesController'
            })
            .when('/ficha-propiedad', {
                templateUrl: '../templates/rural/property-sheet.html',
                controller: 'propertySheetController'
            })
            .when('/quienes-somos', {
                templateUrl: '../templates/rural/about.html',
                controller: 'aboutController'
            })
            .when('/empleo', {
                templateUrl: '../templates/rural/work-with-us.html',
                controller: 'workWithUsController'
            })
            .when('/arrendamientos', {
                templateUrl: '../templates/rural/leases.html'
            })
            .when('/subdivisiones', {
                templateUrl: '../templates/rural/subdivisions.html'
            })
            .otherwise("/");
    });
})();