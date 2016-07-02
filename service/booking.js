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
    	
    	bookedList: function(start ,end){
    		var deferred = global.q.defer();
    		_bookedList(start, end).then(function(res){
    			deferred.resolve(res);
    		}, function(err){
    			deferred.reject(err);
    		});
    		return deferred.promise;
    	},

    	bookedListForUser: function(username, start, end){
    		var deferred = global.q.defer();
			_bookedListForUser(username, start, end).then(function(res){
				deferred.resolve(res);
			}, function(err){
				deferred.reject(err);
			});
			return deferred.promise;
    	},

    	bookedListForAdmin: function(start, end){
    		var deferred = global.q.defer();
			_bookingListForAdmin(start, end).then(function(res){
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

function _bookedList(startdate, enddate){
	var deferred = global.q.defer();
	var start = new Date(startdate);
	var end = new Date(enddate);
	var query = global.connection.query('SELECT id, username, date, slot FROM booking WHERE date >='+ global.connection.escape(start) + ' AND date <='+ global.connection.escape(end), function(err, rows, fields){
		if(err)
			deferred.reject(err);

		deferred.resolve(rows);
	});
	return deferred.promise;
}

function _bookedListForUser(username, startdate, enddate){
	var deferred = global.q.defer();
	var start = new Date(startdate);
	var end = new Date(enddate);
	var query = global.connection.query('SELECT id, username, date, slot FROM booking WHERE date >= '+ global.connection.escape(start) + ' AND date <= '+ global.connection.escape(end) +' AND username = '+ global.connection.escape(username), function(err, rows, fields){
		if(err)
			deferred.reject(err);

		deferred.resolve(rows);
	});
	return deferred.promise;
}

function _bookingListForAdmin(startdate, enddate){
	var deferred = global.q.defer();
	var start = new Date(startdate);
	var end = new Date(enddate);
	var query = global.connection.query('SELECT * from booking WHERE date >=' + global.connection.escape(start)+ ' AND date <=' + global.connection.escape(end), function(err, rows, fields){
		if(err)
			deferred.reject(err);

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
	var post  = {id: id, username: username, date: date, slot: slot, type: type};
	var query = global.connection.query('INSERT INTO booking SET ?', post, function(err, result) {
		if(err)
		  	deferred.reject(err);
		
		deferred.resolve(result);
	});
	return deferred.promise;
}

function _cancelBooking(bookingId){
	var deferred = global.q.defer();
	var query = global.connection.query('DELTE FROM booking WHERE id = ', global.connection.escape(bookingId), function(err, result) {
		if(err)
		  	deferred.reject(err);
		
		deferred.resolve(result);
	});
	return deferred.promise;
}