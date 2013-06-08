'use strict';

angular.module('hnhtApp', ['hnResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

// angular.module('hnhtApp', [])
//   .config(['$httpProvider', function($httpProvider) {
//     delete $httpProvider.defaults.headers.common["X-Requested-With"];
//   }]);