module.exports = function(){

	global.app.get('/holiday', global.util.userAuthentication, function(req, res){

	  //TODO: get holiday list from database

	});

	global.app.post('/holiday', global.util.userAuthentication, function(req, res){

	  //TODO: update holiday list in database

	});

	global.app.put('/holiday/add', function(req, res){
		var date = req.body.date;
		var reason = req.body.reason;
		var post  = {date: date, reason: reason};
		var query = global.connection.query('INSERT INTO holiday SET ?', post, function(err, result) {
		if(err)
		  	res.status(500).send(err);
		res.status(200).send(result);
		});
	});

	global.app.post('/holiday/remove', function(req, res){
		var date = req.body.date;
		var query = global.connection.query('DELETE FROM holiday WHERE date = ' + global.connection.escape(date), function(err, result) {
		if(err)
		  	res.status(500).send(err);

		res.status(200).send(result);

		});
	});

	global.app.get('/holiday/list', function(req, res) {
		global.connection.query('select * from holiday', function(err, rows, fields) {
		    if (err) 
		      res.status(500).send(err);


		    res.status(200).send(rows);

		});
	});
};