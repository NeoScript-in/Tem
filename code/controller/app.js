app.controller('app',function($scope, $location){
    $scope.userName = localStorage.getItem('userName');
    $scope.adminType = localStorage.getItem('admin');
    $scope.logout = function(){
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('admin');
        $location.url('/login');
    };

});
