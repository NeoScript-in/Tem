module.exports = function(){
	
	global.app.get('/advbookingdate', function(req, res){
		
		global.settingService.advSettingList().then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });
	});

	global.app.get('/booking/advance', function(req, res) {

		//TODO: get userId from session
		var userId = "abc";
		global.bookingService.bookingListForUser(userId).then(function(result){
			res.status(200).send(result);
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

	global.app.post('/booking/advance', global.util.userAuthentication, function(req, res) {
		res.status(200).send({ message: "" });
	});

	global.app.post('/booking/current', global.util.userAuthentication, function(req, res) {
		res.status(200).send({ message: "" });
	});

	global.app.post('/booking/cancel', global.util.userAuthentication, function(req, res) {
		res.status(200).send({ message: "" });
	});

};