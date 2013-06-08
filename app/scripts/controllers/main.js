'use strict';

angular.module('hnhtApp')
  .controller('MainCtrl', function ($scope, $location, items) {
    $scope.location = $location;
    var limit = ($location.search()).limit || 10;
    var start = parseInt(($location.search()).start, 10) || 0;
    var sigil = ($location.search()).sigil || '5803764-367ff';
    var q = [];
    if (($location.search()).q){
      q = ($location.search()).q.split(' ');
    }

    $scope.keywords = q;
    var contains = function(a, obj) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
          return true;
        }
      }
      return false;
    };

    var removeElement = function(a, obj){
      for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
          a.splice(i, 1);
          return true;
        }
      }
      return false;
    };

    items.get({
      limit: limit,
      start: start,
      sigil: sigil,
      q: q.join(' ')
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
      $scope.total = total;
      $scope.start = start;
      $scope.end = start + $scope.results.length;
    });

    // First page link should not appear if it is already the first page
    $scope.showFirstPageLink = function () {
      if (start <= 0){
        return false;
      } else {
        return true;
      }
    };

    $scope.addKeyword = function(){
      if (!contains(q, $scope.keywordInput)){
        var qStr = $scope.qStr;
        if (qStr === ''){
          qStr = $scope.keywordInput;
        } else {
          qStr =  qStr + ' ' + $scope.keywordInput;
        }
        $location.path('/').search('limit=' + limit + '&q=' + qStr);
      }
    };

    $scope.removeKeyword = function(keyword){
      if (removeElement(q, keyword)){
        var qStr = q.join(' ');
        $location.path('/').search('limit=' + limit + '&q=' + qStr);
      }
    };

    $scope.qStr =  q.join(' ');
  });
