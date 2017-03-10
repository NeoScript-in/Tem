module.exports = function(){
	
	global.app.post('/advbookingdate', global.util.userAuthentication, function(req, res){
		
		global.settingService.advSettingList().then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });
	});

	global.app.post('/booked/list', global.util.userAuthentication, function(req, res) {
		var start  = req.body.startdate;
		var end = req.body.enddate;
		var regular = false;
		if(req.username.type === "regular") {
			regular = true;
		}
		global.bookingService.bookedList(start, end, regular, req.username.username).then(function(result){
			res.status(200).send(result);
		}, function(err){
			res.status(500).send(err);
		});
	});

	global.app.post('/booked/list/user', global.util.userAuthentication, function(req, res) {
		var start  = req.body.startdate;
		var end = req.body.enddate;
		var username = req.username;
		global.bookingService.bookedListForUser(username, start, end).then(function(result){
			res.status(200).send(result);
		}, function(err){
			res.status(500).send(err);
		});
	});

	global.app.post('/booked/list/admin', global.util.adminAuthentication, function(req, res) {
		var start  = req.body.startdate;
		var end = req.body.enddate;
		global.bookingService.bookedListForAdmin(start, end).then(function(result){
			res.status(200).send(result);
		}, function(err){
			res.status(500).send(err);
		});
	});

	global.app.post('/booking/new/', global.util.userAuthentication, function(req, res) {
		var username = req.username || req.body.username;
		var date = req.body.date;
		var slot = req.body.slot;
		global.bookingService.createBooking(username, date, slot).then(function(result){
			res.status(200).send("Success");
		}, function(err){
			res.status(500).send(err);
		});
		
	});

	global.app.post('/holiday/list', function(req, res) {

		var date = req.body.enddate;
		global.settingService.holidayListLimit(date).then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });
	});

	global.app.post('/booking/cancel', global.util.userAuthentication, function(req, res) {
		var bookingId = req.body.bookingId.id;
		global.bookingService.cancelBooking(bookingId).then(function(result){
			res.status(200).send(result);
		}, function(err){
			res.status(500).send("Unable to delete. Try again later.");
		});
	});

};