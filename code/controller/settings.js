app.controller('settings',function($scope, $location, $filter, settingsService){
	$scope.holidayList = [];
	$scope.data = {};
	$scope.today = function() {
    	$scope.dt = new Date();
  	};
  	$scope.today();

  	$scope.clear = function() {
    	$scope.dt = null;
  	};

  	$scope.options = {
    	customClass: getDayClass,
    	minDate: new Date(),
    	showWeeks: true
  	};

  	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date(tomorrow);
	afterTomorrow.setDate(tomorrow.getDate() + 1);

  	$scope.events = [
	    {
	      date: tomorrow,
	      status: 'full'
	    },
	    {
	      date: afterTomorrow,
	      status: 'partially'
	    }
	];

  	function getDayClass(data) {
	    var date = data.date,
	    mode = data.mode;
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i = 0; i < $scope.events.length; i++) {
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }
    }

    $scope.add = function(){
    	var date = $scope.dt;
    	var reason = $scope.data.singleSelect;
    	settingsService.add(date, reason).then(function(res){
    		alert(res);
    	}).catch(function(err){
    		alert(err);
    	});
    };

    $scope.remove = function(date){
    	var formattedDate = $filter('date')(date, 'yyyy-MM-dd');
    	settingsService.remove(formattedDate).then(function(res){
    		console.log(res);
    	}).catch(function(err){
    		console.log(err);
    	});
    };

    $scope.list = function(){
    	settingsService.list().then(function(res){
    		console.log(res);
    		$scope.holidayList = res.data;
    	}).catch(function(err){
    		console.log(err);
    	});
    };

    $scope.list();
});