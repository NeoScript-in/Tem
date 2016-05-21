module.exports = function(){

	global.app.post('/login', function(req, res) {
	  var userName = req.body.username;
	  var password = req.body.password;
	  var admn = false;
	  if(req.body.admin){
	    admin = true;
	  }
	  
	  global.userService(userName, password, admin).then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(400).send(err);
        });
	  
	});

	global.app.get('/user/list', global.util.adminAuthentication, function(req, res) {
		
	});

	global.app.put('/user/update', function(req, res) {
	    var email = req.body.email;
	    var name = req.body.name;
	    var password = req.body.password;
	    var type = 'admin';

	    console.log(JSON.stringify(req.body));

	    if(!req.body.admin){
	        type = 'regular';
	    }

	    if(req.body.username){
	      //user exists.. update new changes
	      var userName = req.body.username;
	    }else {
	      //user does not exists.. add new user
	    }

	    //TODO: add/update data to DB
	    res.status(200).send({ message: "" });
	});

	global.app.delete('/user/delete', adminAuthentication, function(req, res) {
	  res.status(200).send({ message: "" });
	});

	global.app.post('/password/check', userAuthentication, function(req, res) {
	  res.status(200).send({ message: "" });
	});

	global.app.post('/password/change', userAuthentication, function(req, res) {
	  res.status(200).send({ message: "" });
	});
};