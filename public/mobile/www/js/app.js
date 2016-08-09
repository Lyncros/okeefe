// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'satellizer', 'uiGmapgoogle-maps', 'starter.controllers', 'starter.services'])
    .run(function ($ionicPlatform) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(
        function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, uiGmapGoogleMapApiProvider, $authProvider) {

            var commonConfig = {
                popupOptions: {
                    location: 'no',
                    toolbar: 'yes',
                    width: window.screen.width,
                    height: window.screen.height
                }
            };

            $authProvider.loginUrl = 'http://localhost:8000/api/' + 'login';

            $authProvider.facebook(angular.extend({}, commonConfig, {
                url: 'http://localhost:8000/api/' + 'auth/facebook',
                clientId: '811994185568400'
            }));

            $authProvider.google(angular.extend({}, commonConfig, {
                url: 'http://localhost:8000/api/' + 'auth/google',
                clientId: '288229723311-qu333634liboqneomltl3jbvn0js9suq.apps.googleusercontent.com'
            }));

            $ionicConfigProvider.tabs.position('bottom');
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyDMSy5R0Rfyx7rnhJ50sBUsHawncc87tJo',
                v: '3',
                libraries: 'weather,geometry,visualization'
            });
            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

            // setup an abstract state for the tabs directive
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'templates/menu.html',
                    controller: 'menuController'
                })
                .state('app.home', {
                    url: '/inicio',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/home.html',
                            controller: 'homeController'
                        }
                    }
                })
                .state('app.appraisals', {
                    url: '/tasaciones',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/appraisals.html',
                            controller: 'homeController'
                        }
                    }
                })
                .state('app.investments', {
                    url: '/inversiones',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/investments.html',
                            controller: 'investmentsController'
                        }
                    }
                })
                .state('app.about', {
                    url: '/quienes-somos',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/about.html',
                            controller: 'aboutController'
                        }
                    }
                })
                .state('app.us', {
                    url: '/porque-nosotros',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/why-us.html',
                            controller: 'usController'
                        }
                    }
                })
                .state('app.properties', {
                    url: '/propiedades',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/properties.html',
                            controller: 'propertiesController'
                        }
                    }
                })
                .state('app.propertySheet', {
                    url: '/ficha',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/property-sheet.html',
                            controller: 'propertySheetController'
                        }
                    }
                })
                .state('app.ventureSheet', {
                    url: '/emprendimiento',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/venture-sheet.html',
                            controller: 'ventureSheetController'
                        }
                    }
                })
                .state('app.news', {
                    url: '/noticias',
                    views: {
                        'appContent': {
                            templateUrl: 'templates/news.html',
                            controller: 'newsController'
                        }
                    }
                })
                .state('user', {
                    url: "/usuario",
                    abstract: true,
                    templateUrl: "templates/user/account.html"
                })
                .state('user.account', {
                    url: '/cuenta',
                    views: {
                        'user-account': {
                            templateUrl: 'templates/user/info.html',
                            controller: 'accountController',
                        }
                    }
                })
                .state('user.fav', {
                    url: '/favoritos',
                    views: {
                        'user-fav': {
                            templateUrl: 'templates/user/fav.html',
                        }
                    }
                })
                .state('user.contact', {
                    url: '/contacto',
                    views: {
                        'user-contact': {
                            templateUrl: 'templates/user/contact.html',
                        }
                    }
                })
                .state('auth', {
                    url: "/auth",
                    abstract: true,
                    templateUrl: "templates/auth/auth.html"
                })
                .state('auth.register', {
                    url: '/registro',
                    views: {
                        'auth-content': {
                            templateUrl: 'templates/auth/register.html',
                            controller: 'registerController'
                        }
                    }
                })
                .state('auth.login', {
                    url: '/login',
                    views: {
                        'auth-content': {
                            controller: 'userController',
                            templateUrl: 'templates/auth/login.html',
                        }
                    }
                });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/inicio');

        });
