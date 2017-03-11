app.controller('app',function($scope, $location){
    $scope.userName = localStorage.getItem('userName');
    var val = localStorage.getItem('admin');
    if(val === "true")
    	$scope.adminType = true;
    else
    	$scope.adminType = false;
   
    $scope.logout = function(){
    	$scope.adminType = false;
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('admin');
        window.location.href = "/#/login";
    };

});
