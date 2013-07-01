'use strict';

angular.module('hnResource', ['ngResource'])
  .factory('items', function ($resource) {
    var url = 'http://api.thriftdb.com/api.hnsearch.com/items/_search';
    return $resource(url, {}, {
      get: {
        method: 'JSONP',
        params: {
          'highlight[markup_items]': true,
          'q': 'san+bay',
          'filter[fields][parent_sigid]': '5970187-99581',
          'filter[fields][type]': 'comment',
          'sortby': 'create_ts desc',
          'limit': 10,
          'start': 10,
          'callback': 'JSON_CALLBACK'
        }
      }
    });
  });
