app.factory('bookingService',function($http){
    return {
        newBooking: function(userId, date){

        },

        cancelBooking: function(userId, data){

        },

        bookingStatus: function(userId){
          
        },

        holidayList: function(){
        	
        },

        bookingSlots: function(){
            return $http.get('/booking/advance');
        },

        advBookingDate: function(){
            return $http.get("/advbookingdate");
        },

        holidayList: function(enddate){
            var data = {};
            data.enddate = enddate;
            return $http.post("/holiday/list", data);
        },
    };
});
