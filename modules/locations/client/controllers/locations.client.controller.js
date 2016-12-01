(function () {
  'use strict';

  // Locations controller
  angular
    .module('locations')
    .controller('LocationsController', LocationsController);

  LocationsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'locationResolve', 'LocationsService'];

  function LocationsController ($scope, $state, $window, Authentication, location, LocationsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.location = location;
    vm.error = null;
    vm.form = {};
    vm.save = save;

    // Save Location
    function save() {
      if(vm.authentication.user){
        vm.location.loading = true;
        if (vm.location.isGoing) {
          console.log("removing: " + JSON.stringify(vm.location.id));
          vm.location.$remove(successCallback, errorCallback);
        } else {
          console.log("adding: " + JSON.stringify(vm.location.id));
          //vm.location.$save(successCallback, errorCallback);
          LocationsService.save({ name: vm.location.name }, successCallback, errorCallback);
        }
      }
      else{
        $state.go('authentication.signin');
      }
      function successCallback(res) {
        vm.location.isGoing = res.isGoing;
        vm.location.goingCount = res.goingCount;
        vm.location.loading = false;
      }

      function errorCallback(res) {
        vm.error = res.data.message;
        vm.location.loading = false;
      }
    }
  }
}());
