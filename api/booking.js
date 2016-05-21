module.exports = function(){
	
	global.app.get('/booking/advance', global.util.userAuthentication, function(req, res) {

	   if (firstHalf()) {
	     //TODO: send booking status of firstHalf of month
	     res.status(200).send({ data: "" });
	   }else {
	     //TODO: send booking status of secondHalf of month
	     res.status(200).send({ data: "" });
	   }
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