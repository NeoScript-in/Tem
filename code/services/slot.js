app.factory('bookingService',function($http){
    return {
        newBooking: function(username, date, slot){
            var data = {};
            data.username = username;
            data.date = date;
            data.slot = slot;
            data.token = localStorage.getItem('token');

            return $http.post('/booking/new/', data);
        },

        cancelBooking: function(userId, data){

        },

        bookedList: function(start, end){
            var data = {};
            data.startdate = start;
            data.enddate = end;
            data.token = localStorage.getItem('token');
            return $http.post('/booked/list', data);
        },

        bookedListUser: function(start, end){
            var data = {};
            data.startdate = start;
            data.enddate = end;
            data.token = localStorage.getItem('token');
            return $http.post('/booked/list/user', data);
        }, 

        bookedListAdmin: function(start, end){
            var data = {};
            data.startdate = start;
            data.enddate = end;
            data.token = localStorage('token');
            return $http('booked/list/admin', data);
        }, 

        bookingSlots: function(){
            return $http.get('/booking/advance');
        },

        advBookingDate: function(){
            var data = {};
            data.token = localStorage.getItem('token');
            return $http.post("/advbookingdate", data);
        },

        holidayList: function(enddate){
            var data = {};
            data.enddate = enddate;
            data.token = localStorage.getItem('token');
            return $http.post("/holiday/list", data);
        },
    };
});
