'use strict';

angular.module('idResource', ['ngResource'])
    .factory('latestThread', function ($resource) {
  var url = 'http://api.thriftdb.com/api.hnsearch.com/items/_search';
  return $resource(url, {}, {
    get: {
      method: 'JSONP',
      params: {
        'q': 'hiring',
        'filter[fields][username]': 'whoishiring',
        'sortby': 'create_ts desc',
        'limit': 1,
        'callback': 'JSON_CALLBACK'
      }
    }
  });
});
