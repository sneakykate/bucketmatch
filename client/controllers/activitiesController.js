angular
  .module('ActivitiesController', ['ngRoute', 'EventFactory', 'ActivityFactory', 'UserFactory'])
  .controller('activitiescontroller', ['$scope', '$location']);

function activitiescontroller($scope, $location, EventFactory, ActivityFactory, UserFactory) {

  //$scope.users = [];

  $scope.userSelectView = function () {
    // function to load user view.
  };

  //use fetch from eventFactory that gets all users info.
  function getUsers() {
	  EventFactory.fetchUsers()
      .then(function (res){
	  	  $scope.users = res.data[0].username;	
        $scope.userimage = res.data[0].profilepic;
	  });
	};
  $scope.users = getUsers();
  
  //get's userProfile when you click on the user
  function getUserProfile() {
    UserFactory.getUser()
  }


};
