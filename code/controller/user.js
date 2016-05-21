app.controller('user',function($scope, $location, userService, toastr){

  $scope.user = {};

  $scope.updateUser = function(){
      userService.saveUser($scope.user).then(function(result){

          $scope.reset();
          toastr.success("User data saved successfully", "Success");

      }).catch(function(error){

          toastr.error(error, "Error");

      });
  };

  $scope.deleteUser = function(){

  };

  $scope.userList = function(){

  };

  $scope.getUserData = function(username){

  };

  $scope.reset = function(){

    $scope.userForm.$setPristine();
    $scope.userForm.$setValidity();
    $scope.user = {};
  };
});
