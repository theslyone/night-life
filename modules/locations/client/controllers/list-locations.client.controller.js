(function () {
  'use strict';

  angular
    .module('locations')
    .controller('LocationsListController', LocationsListController);

  LocationsListController.$inject = ['LocationsService', '$state', '$stateParams'];

  function LocationsListController(LocationsService, $state, $stateParams) {
    var vm = this;
    //vm.businesses = LocationsService.search($stateParams.query);
    vm.businesses = LocationsService.query({ query: $stateParams.query });

    vm.getLocation = function(business) {
      $state.go('locations.view', { locationId: business.id });
    };
  }
}());
