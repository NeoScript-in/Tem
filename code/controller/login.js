app.controller('login',function($scope, $location, userService){
    $scope.login = function(){
        userService.login($scope.username, $scope.password, $scope.admin).then(function(result){
            if(localStorage){
                localStorage.setItem('token',result.token);
                localStorage.setItem('userName',result.name);
                localStorage.setItem('admin',result.admin);
            }
            $location.path('/home');
        }).catch(function(err){
            $scope.error = "Authentication Failed";
            console.log("Authentication failed");
        });

    };

});
