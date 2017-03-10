app.controller('home',function($scope, $location, $q, $sce, bookingService, userService, toastr){
    $scope.adminType = userService.userType();
    var currentDate = new Date();
    $scope.month = currentDate.getMonth()+1;
    $scope.year = currentDate.getFullYear();
    var days = daysInMonth($scope.month, $scope.year);
    var currentDay = currentDate.getDate();
    var weekDay = currentDate.getDay();
    $scope.bookingWindow = true;
    $scope.holidayList = [];
    $scope.toCancel = {};
    $scope.cancelList = [];
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
        //var bookingDate = $scope.slotValue.date.setDate($scope.slotValue.date.getDate() + 1);
        bookingService.newBooking($scope.userName, $scope.slotValue.date, $scope.slotValue.slot).then(function(res){
            toastr.success("Slot Booked", "Success");
        }).catch(function(err){
            toastr.error(err.data, "Error");
        });

        console.log($scope.slotValue);
    };

    $scope.cancel = function(index){
        bookingService.cancelBooking($scope.toCancel.id).then(function(){
            toastr.success("Booking Cancelled", "Success");
            for(var i=0; i<$scope.bookedList.length; i++){
                if($scope.bookedList[i].id === $scope.toCancel.id.id){
                    $scope.bookedList.splice(i, 1);
                }
            }
        }).catch(function(err){
            toastr.error(err.data, "Error");
        });
    };

    $scope.advance = function(){
        $scope.bookingWindow = true;
        var i = new Date($scope.bookingDate.bookstart);
        var j = new Date($scope.bookingDate.bookend);
        $scope.dateRange = [];
        $scope.dateRange = validDates($scope.bookingDate.bookstart, $scope.bookingDate.bookend);
    };

    $scope.showCancelList = function(){
        if(!$scope.adminType) {
            for (var i=0; i<$scope.bookedList.length; i++) {
                if($scope.bookedList[i].username === $scope.userName) {
                    $scope.cancelList.push($scope.bookedList[i]);
                }
            }
        } else {
            $scope.cancelList = $scope.bookedList;
        }
        $scope.bookingWindow = false;
    }

    $scope.print = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=500,height=700');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /><link href="css/bootstrap.min.css" rel="stylesheet"> \
<link href="css/bootstrap-responsive.min.css" rel="stylesheet"></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };

    $scope.init = function(){
        bookingService.advBookingDate().then(function(res){
            
            if(res.data.length > 0){
                $scope.bookingDate = res.data[0];
                var start = $scope.bookingDate.bookstart;
                var end = $scope.bookingDate.bookend;
                var promise = {
                    holiday: bookingService.holidayList(end),
                    bookedList: bookingService.bookedList(start, end)
                };

                $q.all(promise).then((result)=>{
                    $scope.holidayList = result.holiday.data;
                    $scope.dateRange = [];
                    $scope.dateRange = validDates($scope.bookingDate.bookstart, $scope.bookingDate.bookend);
                    $scope.bookedList = result.bookedList.data;
                    if(!userService.userType){
                        for(var i=0; i<$scope.bookedList.length; i++){
                            if($scope.bookedList[i].username !== localStorage.getItem('userName')){
                                $scope.bookedList.splice(i,1);
                            }
                        }
                    }
                });
            }else{
                toastr.warning("Machine is currently unavailable for booking.", "Unavailable", {
                    closeButton: true,
                    position: 'toast-bottom-full-width'
                });
            }
            
        }).catch(function(err){
            toastr.error("Error while booking schedule", "Error");
        });
    };

    $scope.init();

    function validDates(startDate, endDate){
        var valid = [];
        var start = new Date(startDate);
        var end = new Date(endDate);
        var now = new Date();
        var today = now.setDate(now.getDate() - 2);
        while(start < end){
            if(start >= today){
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
