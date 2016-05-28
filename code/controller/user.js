app.controller('user',function($scope, $location, userService, toastr){

    $scope.user = {};
    $scope.userList = [];

    $scope.updateUser = function(){
        userService.saveUser($scope.user).then(function(result){
            $scope.reset();
            toastr.success("User data saved successfully", "Success");

        }).catch(function(error){

            toastr.error(error, "Error");

        });
    };

    $scope.editUser = function(index){
        $scope.user = {};
        $scope.user.id = $scope.userList[index].id;
        $scope.user.username = $scope.userList[index].username;
        $scope.user.name = $scope.userList[index].name;
        $scope.user.email = $scope.userList[index].email;
        $scope.user.department = $scope.userList[index].department;
        $scope.user.mobile = $scope.userList[index].mobile;
        $scope.user.admin = false;
        if($scope.userList[index].type === "admin"){
            $scope.user.admin = true;
        }
    };

    $scope.removeUser = function(index){
        //TODO: prompt a warning message
        userService.removeUser($scope.userList[index].id).then(function(result){
            $scope.userList.splice(index, 1);
        }).catch(function(err){
            toastr.error(err, "Error");
        });
    };

    $scope.userList = function(){

        userService.userList().then(function(result){

            $scope.userList = result.data;

        }).catch(function(error){

            toastr.error("Unable to load user list", "Error");

        });

    };

    $scope.getUserData = function(username){

    };

    $scope.reset = function(){

        $scope.userForm.$setPristine();
        $scope.user = {};
    };

    $scope.userList();

});
