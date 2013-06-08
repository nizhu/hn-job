'use strict';

angular.module('hnhtApp')
  .controller('MainCtrl', function ($scope, $location, items) {
    $scope.location = $location;
    var limit = ($location.search()).limit || 10;
    var start = ($location.search()).start || 0;
    var sigil = ($location.search()).sigil || '5803764-367ff';

    items.get({
      limit: limit,
      start: start,
      sigil: sigil
    }, function (data){
      $scope.results = data.results;
      var total = data.hits;

      // Calculate first result of next page
      // Next page link should not appear if there is 1 or less pages left
      var nextStart = parseInt(start, 10) + parseInt(limit, 10);
      if (total - limit > nextStart){
        $scope.nextStart = nextStart;
      } else {
        $scope.nextStart = false;
      }

      // First result of previous page
      // Previous page link should not appear if that is less than 1
      var prevStart = start - limit;
      if (prevStart < 1){
        $scope.prevStart = false;
      } else {
        $scope.prevStart = prevStart;
      }

      // First result of the last page
      // Last page link should not appear if it is already last page
      var sizeLastPage = total % parseInt(limit, 10);
      if (sizeLastPage === 0) {
        sizeLastPage = limit;
      }
      if (nextStart > total){
        $scope.lastStart = false;
      } else {
        $scope.lastStart = total - sizeLastPage;
      }

      // First page link should not appear if it is already the first page
      $scope.showFirstPageLink = function () {
        if (start <= 0){
          return false;
        } else {
          return true;
        }
      };

    });

    $scope.$watch('location.search()', function(){
      $scope.limit = ($location.search()).limit;
    }, true);
    $scope.$watch('location.search()', function(){
      $scope.start = ($location.search()).start;
    }, true);
    $scope.$watch('location.search()', function(){
      $scope.sigil = ($location.search()).sigil;
    }, true);
  });
