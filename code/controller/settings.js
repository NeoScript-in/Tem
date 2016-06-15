app.controller('settings',function($scope, $location, $filter, settingsService, toastr){
	$scope.holidayList = [];
    $scope.bookingList = [];
	$scope.data = {};
    $scope.booking = {};
	$scope.today = function() {
        $scope.dt = new Date();
        $scope.booking.advStartDate = new Date();
        $scope.booking.advEndDate = new Date();
        $scope.booking.bookingStartDate = new Date();
        $scope.booking.bookingEndDate = new Date();
    };
  	$scope.today();

  	$scope.clear = function() {
    	$scope.dt = null;
        $scope.booking.advStartDate = null;
        $scope.booking.advEndDate = null;
        $scope.booking.bookingStartDate = null();
        $scope.booking.bookingEndDate = null();
  	};

  	$scope.options = {
    	customClass: getDayClass,
    	minDate: new Date(),
    	showWeeks: true
  	};

    $scope.advStartDate = {
        opened: false
    }

    $scope.advEndDate = {
        opened: false
    }

    $scope.bookStartDate = {
        opened: false
    }

    $scope.bookEndDate = {
        opened: false
    }

    $scope.openAdvStart = function(){
        $scope.advStartDate.opened = true;
    }

    $scope.openAdvEnd = function(){
        $scope.advEndDate.opened = true;
    }

    $scope.openBookStart = function(){
        $scope.bookStartDate.opened = true;
    }
    $scope.openBookEnd = function(){
        $scope.bookEndDate.opened = true;
    }

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
    		toastr.success("Date added to holiday list", "Success");
    	}).catch(function(err){
    		toastr.error("Error while adding date to holiday list", "Error");
    	});
    };

    $scope.remove = function(date){
    	var formattedDate = $filter('date')(date, 'yyyy-MM-dd');
    	settingsService.remove(formattedDate).then(function(res){
    		toastr.success("Date removed from holiday list", "Success");
    	}).catch(function(err){
    		toastr.error("Error while removing date from holiday list", "Error");
    	});
    };

    $scope.list = function(){
    	settingsService.list().then(function(res){
    		//console.log(res);
    		$scope.holidayList = res.data;
    	}).catch(function(err){
    		toastr.error("Error while loading holiday list", "Error");
    	});
    };

    $scope.addBooking = function(){

        var advStartDate = $scope.booking.advStartDate;
        var advEndDate = $scope.booking.advEndDate;
        var bookingStartDate = $scope.booking.bookingStartDate;
        var bookingEndDate = $scope.booking.bookingEndDate;
        settingsService.addBooking(advStartDate, advEndDate, bookingStartDate, bookingEndDate).then(function(res){
            console.log(res);
        }).catch(function(err){
            toastr.error("Error adding new booking settings", "Error");
        });
    }

    $scope.listBooking = function(){
        settingsService.listBooking().then(function(res){
            $scope.bookingList = res.data;
        }).catch(function(err){
            toastr.error("Error while booking schedule", "Error");
        });
    }
    $scope.list();
    $scope.listBooking();
});