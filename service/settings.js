module.exports = function(){
    
    return {
    	
    	holidayList: function(){
    		var deferred = global.q.defer();
            _listHoliday().then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},

    	holidayListLimit: function(enddate){
    		var deferred = global.q.defer();
            _listHolidayWithLimit(enddate).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},

    	holidayAdd: function(date, reason){
    		var deferred = global.q.defer();
            _addHoliday(date, reason).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},

    	holidayRemove: function(date){
    		var deferred = global.q.defer();
            _removeHoliday(date).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},

    	advSettingUpsert: function(data){
    		var deferred = global.q.defer();

    		if(data.id){
    			_advSettingUpdate(data.id, data.advStartDate, data.advEndDate, data.bookingStartDate, data.bookingEndDate).then(function(res){
	                deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
    		}else{
    			var id = global.util.generateId();
	            _advSettingAdd(id, data.advStartDate, data.advEndDate, data.bookingStartDate, data.bookingEndDate).then(function(res){
	                deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
        	}
            return deferred.promise;
    	},

    	advSettingRemove: function(id){
    		var deferred = global.q.defer();
            _advSettingRemove(id).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},

    	advSettingList: function(){
    		var deferred = global.q.defer();
            _advSettingList().then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	}
    };
};

function _addHoliday(date, reason){

	var deferred = global.q.defer();
	var post  = {date: date, reason: reason};
	var query = global.connection.query('INSERT INTO holiday SET ?', post, function(err, result) {
		if(err)
		  	deferred.reject(err);
		
		deferred.resolve(result);
	});
	return deferred.promise;
}

function _removeHoliday(date){

	var deferred = global.q.defer();
	var date = date;
	var query = global.connection.query('DELETE FROM holiday WHERE date = ' + global.connection.escape(date), function(err, result) {
		if(err)
		  	deferred.reject(err);

		deferred.resolve(result);
	});
	return deferred.promise;
}

function _listHoliday(){

	var deferred = global.q.defer();
	var today = new Date();
	global.connection.query('select * from holiday WHERE date >= '+ global.connection.escape(today), function(err, rows, fields) {
	    if (err) 
	    	deferred.reject(err);

	    deferred.resolve(rows);
	});
	return deferred.promise;
}

function _listHolidayWithLimit(enddate){

	var deferred = global.q.defer();
	var today = new Date();
	var end = new Date(enddate);
	global.connection.query('select * from holiday WHERE date >= '+ global.connection.escape(today) + ' AND date <=' + global.connection.escape(end), function(err, rows, fields) {
	    if (err) 
	    	deferred.reject(err);

	    deferred.resolve(rows);
	});
	return deferred.promise;
}

function _advSettingAdd(id, advStartDate, advEndDate, bookingStartDate, bookingEndDate){
	var deferred = global.q.defer();
	var post  = {id: id, advancebookstart: advStartDate, advancebookend: advEndDate, bookstart: bookingStartDate, bookend: bookingEndDate};
	var query = global.connection.query('INSERT INTO bookingdate SET ?', post, function(err, result) {
		if(err)
		  	deferred.reject(err);
		
		deferred.resolve(result);
	});
	return deferred.promise;
}

function _advSettingUpdate(id, advStartDate, advEndDate, bookingStartDate, bookingEndDate){
	var deferred = global.q.defer();
	var query = global.connection.query('UPDATE bookingdate SET advancebookstart = '+global.connection.escape(advStartDate)+', advancebookend = '+global.connection.escape(advEndDate)+', bookstart = '+global.connection.escape(bookingStartDate)+', bookend='+global.connection.escape(bookingEndDate)+'WHERE id = ' + global.connection.escape(data.id), post, function(err, result) {
		if(err)
		  	deferred.reject(err);
		
		deferred.resolve(result);
	});
	return deferred.promise;
}

function _advSettingRemove(id){
	var deferred = global.q.defer();
	var query = global.connection.query('DELETE FROM bookingdate WHERE id = ' + global.connection.escape(id), function(err, result) {
		if(err)
		  	deferred.reject(err);

		deferred.resolve(result);
	});
	return deferred.promise;
}

function _advSettingList(){
	var deferred = global.q.defer();
	var today = new Date();
	var query = global.connection.query('SELECT * FROM bookingdate WHERE bookend >= ' + global.connection.escape(today), function(err, result) {
		if(err)
		  	deferred.reject(err);

		deferred.resolve(result);
	});
	return deferred.promise;
}