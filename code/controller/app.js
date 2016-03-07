app.controller('app',function($scope, $location){
    $scope.userName = localStorage.getItem('userName');
    $scope.adminType = localStorage.getItem('admin');
    console.log($scope.adminType);
    console.log($scope.userName);
    $scope.logout = function(){
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('admin');
        $location.url('/login');
    };

});
