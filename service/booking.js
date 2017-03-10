module.exports = function(){
    var obj = {

    	advBookingDate: function(){
    		var deferred = global.q.defer();
            _advBookingDate().then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},
    	
    	bookedList: function(start ,end, regular, username){
    		var deferred = global.q.defer();
    		_bookedList(start, end, regular, username).then(function(res){
    			deferred.resolve(res);
    		}, function(err){
    			deferred.reject(err);
    		});
    		return deferred.promise;
    	},

    	createBooking: function(username, date, slot){
    		var deferred = global.q.defer();
			var id = global.util.generateId();
			var type = 'advance';
			_createBooking(id, username, date, slot, type).then(function(res){
				deferred.resolve(res);
			}, function(err){
				deferred.reject(err);
			});
			return deferred.promise;
    	},

    	cancelBooking: function(id){
    		var deferred = global.q.defer();
			_cancelBooking(id).then(function(res){
				deferred.resolve(res);
			}, function(err){
				deferred.reject(err);
			});
			return deferred.promise;
    	}
	};
	return obj;
};

function _advBookingDate(){
	var deferred = global.q.defer();
	var today = new Date();
	var query = global.connection.query('SELECT * FROM bookingdate WHERE bookend >= ' + global.connection.escape(today), function(err, result) {
		if(err)
		  	deferred.reject(err);

		deferred.resolve(result[0]);
	});
	return deferred.promise;
}

function _bookedList(startdate, enddate, regular, username){
	var deferred = global.q.defer();
	var start = global.tz.tz(startdate, "Asia/Kolkata").format("YYYY-MM-DD");
	var end = global.tz.tz(enddate, "Asia/Kolkata").format("YYYY-MM-DD");
	var queryString = 'SELECT id, username, date, slot FROM booking WHERE date >='+ global.connection.escape(start) + ' AND date <='+ global.connection.escape(end);
	if(regular) {
		//queryString = queryString + ' AND username = '+ global.connection.escape(username);
	}
	var query = global.connection.query(queryString, function(err, rows, fields){
		if(err)
			deferred.reject(err);

		for(var i=0; i<rows.length; i++) {
			rows[i].date = global.tz.tz(timezonesetting(rows[i].date), "Asia/Kolkata").format();
		}
		deferred.resolve(rows);
	});
	return deferred.promise;
}

function _createBooking(id, username, date, slot, type){
	var deferred = global.q.defer();
	if(slot === "slot1"){
		slot = 1;
	}else{
		slot = 2;
	}
	date = global.tz.tz(date, "Asia/Kolkata").format("YYYY-MM-DD");
	var post  = {id: id, username: username.username, date: date, slot: slot, type: type};
	var query = global.connection.query('INSERT INTO booking SET ?', post, function(err, result) {
		if(err) {
			if(err.code === "ER_DUP_ENTRY") {
				deferred.reject("Slot is already booked");
			}
			deferred.reject(err);
		}
		deferred.resolve(result);
	});
	return deferred.promise;
}

function _cancelBooking(bookingId){
	var deferred = global.q.defer();
	var query = global.connection.query('DELETE FROM booking WHERE id = '+ global.connection.escape(bookingId), function(err, result) {
		if(err)
		  	deferred.reject(err);
		
		deferred.resolve(result);
	});
	return deferred.promise;
}

function timezonesetting(datetime) {
	var date = global.moment(datetime);
	var newdate = date.clone();
	// shift the moment by the difference in offsets
	newdate.add(date.utcOffset() - newdate.utcOffset(), 'minutes').format();
	return global.moment(newdate)._d;
}