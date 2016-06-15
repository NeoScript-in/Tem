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
        }
    };
});
