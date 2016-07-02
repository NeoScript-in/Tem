app.controller('home',function($scope, $location, $q, $sce, bookingService){

    var currentDate = new Date();
    $scope.month = currentDate.getMonth()+1;
    $scope.year = currentDate.getFullYear();
    var days = daysInMonth($scope.month, $scope.year);
    var currentDay = currentDate.getDate();
    var weekDay = currentDate.getDay();
    $scope.bookingWindow = true;
    $scope.holidayList = [];
    $scope.toCancel = {};

    $scope.dateValue = function(day, month, year){
        return new Date(year, month-1, day);
    };

    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }


    $scope.radioChecked = function(slot){
        console.log(slot);
    };

    $scope.book = function(){
        bookingService.newBooking($scope.userName, $scope.slotValue.date, $scope.slotValue.slot).then(function(res){

        }).catch(function(err){

        });

        console.log($scope.slotValue);
    };

    $scope.cancel = function(){
        console.log($scope.slotValue);
    };

    $scope.advance = function(){
        $scope.bookingWindow = true;
        var i = new Date($scope.bookingDate.bookstart);
        var j = new Date($scope.bookingDate.bookend);
        $scope.dateRange = [];
        $scope.dateRange = validDates(i, j);
    };

    $scope.showCancelList = function(){
        $scope.bookingWindow = false;
    }

    $scope.print = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=500,height=700');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };

    $scope.init = function(){
        bookingService.advBookingDate().then(function(res){
            $scope.bookingDate = res.data[0];
            var start = new Date($scope.bookingDate.bookstart);
            var end = new Date($scope.bookingDate.bookend);
            var promise = {
                holiday: bookingService.holidayList(end),
                bookedList: bookingService.bookedList(start, end)
            };

            $q.all(promise).then((result)=>{
                $scope.holidayList = result.holiday.data;
                $scope.dateRange = [];
                $scope.dateRange = validDates($scope.bookingDate.bookstart, $scope.bookingDate.bookend);
                $scope.bookedList = result.bookedList.data;
            });

        }).catch(function(err){
            toastr.error("Error while booking schedule", "Error");
        });
    };

    $scope.init();

    function validDates(startDate, endDate){
        var valid = [];
        var start = new Date(startDate);
        var end = new Date(endDate);
        var now = Date.now();
        var today = (new Date(now)).toLocaleDateString();
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

    /*function holidayList(endDate){
        bookingService.holidayList(endDate).then(function(res){
            $scope.holidayList = res.data;
            $scope.dateRange = [];
            $scope.dateRange = validDates($scope.bookingDate.bookstart, $scope.bookingDate.bookend);
        }).catch(function(err){
            toastr.error("Error while loading holiday list", "Error");
        });
    };*/

    $scope.isHoliday = function(dateValue){
        var date = new Date(dateValue);
        if(date.getDay() == 6 || date.getDay() == 0){
            return $sce.trustAsHtml('<span style="color: #ffa31a;">&nbsp;Holiday</span>');
        }
        var date = dateValue.toLocaleDateString();
        for(var i=0; i<$scope.holidayList.length; i++){
            var temp = new Date($scope.holidayList[i].date);
            if(date === temp.toLocaleDateString()){
                return $sce.trustAsHtml('<span style="color: #ffa31a;">&nbsp;Holiday</span>');
            }            
        }
        return false;
    }
    
    $scope.isMaintenance = function(dateValue){
        var date = new Date(dateValue);
        if(date.getDate() == 1 || date.getDate() == -1){
            return $sce.trustAsHtml('<span style="color: #0073e6;">&nbsp;Maintenance</span>');
        }
        return false;
    }

    $scope.isDisabled = function(dateValue, slot){
        var date = new Date(dateValue);
        if($scope.isHoliday(date)){
            return true;
        }else if($scope.isMaintenance(dateValue)){
            return true;
        }else if($scope.isBooked(date, slot)){
            return true;
        }
        return false;
    }

    $scope.isAvailable = function(dateValue, slot){
        return $sce.trustAsHtml('<span style="color: #00BA8B;">&nbsp;Available</span>');
    }
    $scope.isBooked = function(dateValue, slot){
        for(var i=0; i<$scope.bookedList.length; i++){
            var date = new Date($scope.bookedList[i].date);
            if(date.toUTCString() === dateValue.toUTCString() && slot === 'slot'+$scope.bookedList[i].slot){
                return $sce.trustAsHtml('<span style="color: #ff4d4d;">&nbsp;Not Available</span>');
            }
        }
        return false;
    };

    /*$scope.bookedList = function(start, end){
        bookingService.bookedList(start, end).then(function(result){
            $scope.bookedList = result.data;
        }).catch(function(err){
            toastr.error("Unable to laod booking status", "Error");
        });
    }*/

    $scope.bookedListForCancel = function(start, end){

    }
});
