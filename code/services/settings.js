app.factory('settingsService',function($http, $q){
    return {
    	list: function(){
    		return $http.get("/holiday/list");
    	},

    	add: function(date, reason){
    		var data = {};
    		data.date = date;
    		data.reason = reason;
    		return $http.put("/holiday/add", data);
    	},

    	remove: function(date){
    		var data = {};
    		data.date = date;
    		return $http.post("/holiday/remove", data);
    	},

        addBooking: function(advStartDate, advEndDate, bookingStartDate, bookingEndDate){
            
            var data = {};
            data.advStartDate = advStartDate; 
            data.advEndDate = advEndDate; 
            data.bookingStartDate = bookingStartDate; 
            data.bookingEndDate = bookingEndDate;

            return $http.post("/advancebookingsettings/save", data);
        },

        listBooking: function(){
            return $http.get("/advancebookingsettings/list");
        }
    }
});