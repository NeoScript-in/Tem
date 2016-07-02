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
		global.bookingService.bookedList(start, end).then(function(result){
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

	global.app.get('/booking/current', global.util.userAuthentication, function(req, res) {
		if (firstHalf()) {
			//TODO: send 2 days booking status of firstHalf of month
			res.status(200).send({ data: "" });
		}else {
			//TODO: send 2 days booking status of secondHalf of month
			res.status(200).send({ data: "" });
		}
		res.status(200).send({ message: "" });
	});

	global.app.get('/booking/cancel', global.util.userAuthentication, function(req, res) {
		//send cuurently booked slots of a user
		res.status(200).send({ message: "" });
	});

	
	global.app.post('/booking/current', global.util.userAuthentication, function(req, res) {
		res.status(200).send({ message: "" });
	});

	global.app.post('/booking/cancel', global.util.userAuthentication, function(req, res) {
		res.status(200).send({ message: "" });
	});

};