angular
  .module('boundry.eventEditor')
  .controller('RegionEditorCtrl', RegionEditorCtrl);

  RegionEditorCtrl.$inject = [
    '$rootScope',
    '$scope',//This controller gets the same $scope as the controller that handles the environment in which this controller's directive gets put
    '$http'
  ];

  function RegionEditorCtrl ($rootScope, $scope, $http) {
      var unbind = $rootScope.$on('regionClicked', function(event, region){
        event.stopPropagation();

        console.log('CLICK HEARD', region);
        //Check if region has already had its action data saved
        if (region.actions === undefined) {
          //Grab actions data for the passed in region ID
          $http.get('/api/web/organizer/actions/' + region.id)
            .success(function(data) {
              console.log('Action data', data);
              //On resolve, save the data to the scope object we'll eventually send to the server when the user saves
              region.actions = data;
            })
          .error(function(error) {
            console.log(error);
          });
        }

        $scope.currRegionIndex = getRegionIndex(region['$$hashKey']);
        $scope.$apply();
        //Take region id and initiate popout with a form that's bound to the scope's event data

      });

      //TODO: We shouldn't ought to need this. We should just not store our
      //regions in an array.
      function getRegionIndex (regionHash) {
        var regions = $scope.currEventData.regions;
        for (var i = 0; i < regions.length; i ++) {
          if (regions[i]['$$hashKey'] === regionHash) {
            return i;
          }
        }
      }

    $scope.$on('$destroy', unbind);
  }
