module.exports = function(){

    var obj = {

    	login: function(username, password, admin){
    		var deferred = global.q.defer();
    		_login(username, password, admin).then(function(res){
    			deferred.resolve(res);
    		}, function(err){
    			deferred.reject(err);
    		});
  			return deferred.promise;
    	},
    	register: function(){

    	},
    	
    	userExist: function(username){
    		var deferred = global.q.defer();
            _userExist(username).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},

    	saveUserData: function(data){
    		var deferred = global.q.defer();
    		if(!data.id){
    			_addNewUser(data).then(function(res){
                	deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
    		}else{
    			//data.id = util.generateId();
    			_updateUser(data).then(function(res){
	                deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
    		}
            
            return deferred.promise;
    	},

    	deleteUserData: function(username){
    		if(data.id){
    			_deleteUser(data).then(function(res){
	                deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
    		}else{
    			deferred.reject("user does not exist");
    		}
    	},

    	getUser: function(username){
    		var deferred = global.q.defer();
            _getUser(username).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
    	},

    	getAllUserList: function(){
    		var deferred = global.q.defer();
            _allUserList().then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
    	}

	};
	return obj;
};

function _login(username, password, admin){

	var deferred = global.q.defer();
	var type = "regular";

	if(admin){
		type = "admin";
	}

	var query = global.connection.query('SELECT * FROM user WHERE username = ? AND password = ? AND type = ?',[ username, password, type],function(err, result) {
	    if(err){
	    	deferred.reject(err);
	    }

	    if(result[0].count > 0){
	    	var token = global.util.createJWT(userName);
    		deferred.resolve({ token: token, userName: "ranjeet", admin: true  });
	    }
	    else{
	    	deferred.reject({ message: 'Wrong email and/or password' });
	    }
  	});

  	return deferred.promise;
}

function _addNewUser(data){

	var deferred = global.q.defer();

	var post = {};
	post.username = data.username;
	post.name = data.name;
	if(data.admin){
		post.type = "admin";
	}else{
		post.type = "regular";
	}
	post.email = data.email;
	post.department = data.department;
	post.mobile = data.mobile;

	var query = global.connection.query('INSERT INTO user SET ?' + post, function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;
}

function _updateUser(data){

	var deferred = global.q.defer();
	var type;
	if(data.admin){
		type = "admin";
	}else{
		type = "regular";
	}
	var query = global.connection.query('UPDATE user SET name ='+global.connection.escape(data.name)+', email='+global.connection.escape(data.email)+', type='+type+', department='+global.connection.escape(data.department)+', mobile='+global.connection.escape(data.mobile)+' WHERE username = ' + global.connection.escape(data.username), function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;

}

function _deleteUser(username){

	var deferred = global.q.defer();
	var query = global.connection.query('DELETE FROM user WHERE username = ' + global.connection.escape(username), function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;

}

function _userExist(username){

	var deferred = global.q.defer();
	var query = global.connection.query('SELECT COUNT(*) AS count FROM user WHERE username = ' + global.connection.escape(username), function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    if(result[0].count > 0)
	    	deferred.resolve(true);
	    else
	    	deferred.resolve(false);
  	});

	return deferred.promise;

}

function _allUserList(){
	var deferred = global.q.defer();
	var query = global.connection.query('SELECT * FROM user', function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;
}

function _getUser(username){

	var deferred = global.q.defer();
	var query = global.connection.query('SELECT * FROM user WHERE username = '+ global.connection.escape(username), function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;

}

function _getUserList(usernameList){

	var deferred = global.q.defer();
	var query = global.connection.query('SELECT * FROM user WHERE username IN('+ global.connection.escape(usernameList)+')', function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;
}