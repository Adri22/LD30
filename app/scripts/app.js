
'use strict';

angular
        .module('ld30App', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch'
        ])
        .config(function($routeProvider /*, $locationProvider*/) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    /*
                     .when('/main', {
                     templateUrl: 'views/main.html',
                     controller: 'MainCtrl'
                     })
                     */
                    .when('/game', {
                        templateUrl: 'views/game.html',
                        controller: 'GameCtrl'
                    })
                    /*
                     .when('/about', {
                     templateUrl: 'views/about.html',
                     controller: 'AboutCtrl'
                     })
                     */
                    .otherwise({
                        redirectTo: '/'
                    });

            // $locationProvider.html5Mode(true);
        });
