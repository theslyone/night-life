// Locations service used to communicate Locations REST endpoints
(function () {
  'use strict';

  angular
    .module('locations')
    .factory('LocationsService', LocationsService);

  LocationsService.$inject = ['$resource'];

  function LocationsService($resource) {
    var resource = $resource('api/locations/:locationId', {
      locationId: '@id'
    }, {
      update: {
        method: 'PUT'
      },
      search: {
        method: 'GET',
        url: 'api/locations/search',
        isArray: true
      }
    });
    return resource;
  }
}());
