(function(){
    var app = angular.module('okeefeSite', ['uiGmapgoogle-maps','ngAnimate', 'ui.bootstrap','ngSanitize','ngRoute','okeefeSite.services','okeefeSite.controllers']);
    app.config(function ($httpProvider,$routeProvider,uiGmapGoogleMapApiProvider) {
        /*$httpProvider.defaults.headers.get = {
            'X-Knack-Application-ID': '56f21101ee817cc21f844b33',
            'X-Knack-REST-API-Key': 'f8c2f510-f142-11e5-bb24-1d74f7d5df05'
        };*/
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDMSy5R0Rfyx7rnhJ50sBUsHawncc87tJo',
            v: '3',
            libraries: 'weather,geometry,visualization'
        });
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'homeController'
            })
            .when('/inicio', {
                templateUrl: 'templates/home.html',
                controller: 'homeController'
            })
            .when('/inversiones', {
                templateUrl: 'templates/investments.html',
                controller: 'investmentsController'
            })
            .when('/tasaciones', {
                templateUrl: 'templates/appraisals.html',
                controller: 'appraisalsController'
            })
            .when('/noticias', {
                templateUrl: 'templates/news.html',
                controller: 'newsController'
            })
            .when('/propiedades', {
                templateUrl: 'templates/properties.html',
                controller: 'propertiesController'
            })
            .when('/ficha-propiedad', {
                templateUrl: 'templates/property-sheet.html',
                controller: 'propertySheetController'
            })
            .when('/ficha-emprendimiento', {
                templateUrl: 'templates/venture-sheet.html',
                controller: 'ventureSheetController'
            })
            .when('/quienes-somos', {
                templateUrl: 'templates/about.html',
                controller: 'aboutController'
            })
            .when('/empleo', {
                templateUrl: 'templates/work-with-us.html',
                controller: 'workWithUsController'
            })
            .when('/recordar-clave', {
                templateUrl: 'templates/reset-pw.html'
            })
            .otherwise("/");
    });
})();