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
    	
    	bookingListForUser: function(userId){
    		var deferred = global.q.defer();
			_bookingListForUser(userId).then(function(res){
				deferred.resolve(res);
			}, function(err){
				deferred.reject(err);
			});
			return deferred.promise;
    	},

    	bookingListForAdmin: function(adminId){
    		var deferred = global.q.defer();
			_bookingListForAdmin(adminId).then(function(res){
				deferred.resolve(res);
			}, function(err){
				deferred.reject(err);
			});
			return deferred.promise;
    	},

    	createBooking: function(data){
    		var deferred = global.q.defer();
			var id = global.util.generateId();
			var date = data.bookingDate;
			var slot = data.slot;
			var userId = data.userId;
			var type = data.type;
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

function _bookingListForUser(userId){
	var deferred = global.q.defer();
	var date = new Date();
	var today = date.toDateString();
	var query = global.connection.query('SELECT * FROM bookingdate WHERE advancebookstart <= '+ global.connection.escape(today) + ' AND advancebookend >= '+ global.connection.escape(today), function(err, rows, fields){
		if(err)
			deferred.reject(err);

		deferred.resolve(rows);
	});
	return deferred.promise;
}

function _bookingListForAdmin(adminId){
	var deferred = global.q.defer();
	var query = global.connection.query("SELECT ");
	return deferred.promise;
}

function _bookingListOfAUser(userId){
	var deferred = global.q.defer();
	
	return deferred.promise;
}

function _bookedSlotListForAdmin(){
	var deferred = global.q.defer();

	return deferred.promise;
}

function _createBooking(id, userId, date, slot, type){
	var deferred = global.q.defer();
	var post  = {id: id, userid: userId, date: date, slot: slot, type: type};
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

