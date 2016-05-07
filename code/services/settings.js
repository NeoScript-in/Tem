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
    	}
    }
});