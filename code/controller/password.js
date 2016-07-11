app.controller('password',function($scope, $location, userService, toastr){
	$scope.adminType = userService.userType();
  	$scope.passwordVerify = false;
  	$scope.password = {};

  	$scope.verify = function(){
  		userService.passwordVerify($scope.password.oldPass).then(function(res){
  			if(res.data)
  				$scope.passwordVerify = true;
  			else
  				toastr.error("Wrong Password", "Error");
		}).catch(function(err){
			toastr.error("Service Unavailable, Please Try Again", "Error");
		});
  	}

  	$scope.change = function(){
  		if($scope.password.newPass1 && $scope.password.newPass1 === $scope.password.newPass2){
  			userService.passwordChange($scope.password.newPass1).then(function(res){
  				$scope.passwordVerify = false;
  				$scope.password = {};
  				toastr.success("Password Changed Successfully", "Success");
  			}).catch(function(err){
  				toastr.error("Service Unavailable, Please Try Again", "Error");
  			});
  		}else{
  			toastr.error("Password mismatch", "Error");
  		}
  	}
});
