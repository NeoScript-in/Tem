app.controller('home',function($scope, $location){

  var currentDate = new Date();
  $scope.month = currentDate.getMonth()+1;
  $scope.year = currentDate.getFullYear();
  var days = daysInMonth($scope.month, $scope.year);
  var currentDay = currentDate.getDate();
  var weekDay = currentDate.getDay();
  $scope.initial = 1;
  $scope.last = 15;

  if(currentDay <= 15){
    $scope.initial = 1;
    $scope.last = 15;
  }else {
    $scope.initial = 16;
    $scope.last =  days;
  }

  $scope.dateValue = function(day, month, year){
    return new Date(year, month-1, day);
  };

  console.log($scope.initial, $scope.last);
  function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  }

  $scope.dayOfWeek = function(day, month, year) {
    return new Date(year, month-1, day).getDay();
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

  $socpe.bookingSlot = function(){
      bookingService.bookingSlots().then(function(){

      }).catch(function(){

      });
  }
});
