app.controller('home',function($scope, $location, bookingService){

  var currentDate = new Date();
  $scope.month = currentDate.getMonth()+1;
  $scope.year = currentDate.getFullYear();
  var days = daysInMonth($scope.month, $scope.year);
  var currentDay = currentDate.getDate();
  var weekDay = currentDate.getDay();
  /*$scope.initial = 1;
  $scope.last = 15;

  if(currentDay <= 15){
    $scope.initial = 1;
    $scope.last = 15;
  }else {
    $scope.initial = 16;
    $scope.last =  days;
  }
  */
  $scope.dateValue = function(day, month, year){
    return new Date(year, month-1, day);
  };

  console.log($scope.initial, $scope.last);
  function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  }

  $scope.dayOfWeek = function(date) {
    return new Date(date).getDay();
  };

  $scope.radioChecked = function(slot){
    console.log(slot);
  };

  $scope.book = function(){
    console.log($scope.slotValue);
  };

  $scope.cancel = function(){
    console.log($scope.slotValue);
  };

  $scope.current = function(){
    $scope.initial = currentDay;
    $scope.last = currentDay + 1;
    $scope.list = [];
    for(var i=$scope.initial; i<=$scope.last; i++){
      var slot = [];
      slot[0] = {};
      slot[0] = {"date": $scope.dateValue(i, $scope.month, $scope.year), "slot": "slot1" };
      slot[1] = {};
      slot[1] = {"date": $scope.dateValue(i, $scope.month, $scope.year), "slot": "slot2" };
      $scope.list.push({"counter":i, "slot": slot});
    }
  };

  $scope.advance = function(){
    if(currentDay <= 15){
      $scope.initial = 1;
      $scope.last = 15;
    }else {
      $scope.initial = 16;
      $scope.last =  days;
    }

    $scope.list = [];
    for(var i=$scope.initial; i<=$scope.last; i++){
      var slot = [];
      slot[0] = {};
      slot[0] = {"date": $scope.dateValue(i, $scope.month, $scope.year), "slot": "slot1", "booked":true };
      slot[1] = {};
      slot[1] = {"date": $scope.dateValue(i, $scope.month, $scope.year), "slot": "slot2",  };
      $scope.list.push({"counter":i, "slot": slot});
    }
  };

  $scope.cancel = function(){

  };

  $scope.print = function(divName) {
    var printContents = document.getElementById("printable").innerHTML;
    var popupWin = window.open('', '_blank', 'width=500,height=700');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  };

  $scope.advance();

  $scope.bookingSlot = function(){
      bookingService.bookingSlots().then(function(){

      }).catch(function(){

      });
  };

    $scope.listBooking = function(){
        bookingService.advBookingDate().then(function(res){
            $scope.bookingDate = res.data[0];
            var i = new Date($scope.bookingDate.bookstart);
            var j = new Date($scope.bookingDate.bookend);
            //var diff =  Math.abs(j.getTime() - i.getTime());
            //var diffInDays = Math.ceil(c=diff/(1000 * 3600 * 24));
            $scope.dateRange = [];
            $scope.dateRange = validDates(i, j);
        }).catch(function(err){
            toastr.error("Error while booking schedule", "Error");
        });
    };

    $scope.listBooking();

    function unixTime(time){
      return moment(time).unix();
    };

    function validDates(startDate, endDate){
        var valid = [];
        var start = new Date(startDate);
        var end = new Date(endDate);
        var now = Date.now();
        holidayList(end);
        while(start < end){
            if(start >= now){
                var slot = [];
                slot[0] = {};
                slot[0] = {"date": start, "slot": "slot1"};
                slot[1] = {};
                slot[1] = {"date": start, "slot": "slot2"};
                valid.push({'slot':slot});
            }
            var newDate = start.setDate(start.getDate() + 1);
            start = new Date(newDate);
        }
        return valid;
    }

    $scope.getDate = function(date){
        var a = new Date(date);
        return a.getDate();
    };

    function holidayList(endDate){
        bookingService.holidayList(endDate).then(function(res){
            $scope.holidayList = res.data;
        }).catch(function(err){
            toastr.error("Error while loading holiday list", "Error");
        });
    };

    $scope.isHoliday = function(dateValue){
        var date = new Date(dateValue);
        console.log(date.getDay()+', '+ date.getDay()+', '+ date.getDate()+', '+date.getDate());
        if(date.getDay() == 6 || date.getDay() == 0){
            return true;
        }
        return false;
    }
    
    $scope.isMaintenance = function(dateValue){
        var date = new Date(dateValue);
        console.log(date.getDay()+', '+ date.getDay()+', '+ date.getDate()+', '+date.getDate());
        if(date.getDate() == 1 || date.getDate() == -1){
            return true;
        }
        return false;
    }

    $scope.isDisabled = function(dateValue){
        var date = new Date(dateValue);
        console.log(date.getDay()+', '+ date.getDay()+', '+ date.getDate()+', '+date.getDate());
        if(date.getDay() == 6 || date.getDay() == 0 || date.getDate() == 1 || date.getDate() == -1){
            return true;
        }

        return false;
    }

    $scope.isBooked = function(dateValue){

    };
});
