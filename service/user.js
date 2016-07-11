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
    	passwordChange: function(password, username){
    		var deferred = global.q.defer();
    		_passwordChange(password, username).then(function(res){
    			deferred.resolve(res);
    		}, function(err){
    			deferred.reject(err);
    		});
    		return deferred.promise;
    	},

    	passwordCheck: function(password, username){
    		var deferred = global.q.defer();
    		_passwordCheck(password, username).then(function(res){
    			deferred.resolve(res);
    		}, function(err){
    			deferred.reject(err);
    		});
    		return deferred.promise;
    	},

    	isAdmin: function(username){
    		var deferred = global.q.defer();
            _isAdmin(username).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
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
    			data.id = global.util.generateId();
    			_addNewUser(data).then(function(res){
                	deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
    		}else{
    			_updateUser(data).then(function(res){
	                deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
    		}
            
            return deferred.promise;
    	},

    	deleteUserData: function(id){
    		var deferred = global.q.defer();
    		if(id){
    			_deleteUser(id).then(function(res){
	                deferred.resolve(res);
	            },function(err){
	                deferred.reject(err);
	            });
    		}else{
    			deferred.reject("user does not exist");
    		}
    		return deferred.promise;
    	},

    	getUser: function(username){
    		var deferred = global.q.defer();
            _getUser(username).then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
    	},

    	getAllUserList: function(){
    		var deferred = global.q.defer();
            _allUserList().then(function(res){
                deferred.resolve(res);
            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
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

	    if(result.length > 0){
	    	var token = global.util.createJWT(result[0].username);
	    	var type = false;
	    	if(result[0].type === "admin")
	    		type = true;
	    	deferred.resolve({ token: token, username: result[0].username, admin: type  });
	    }
	    else{
	    	deferred.reject({ message: 'Wrong email and/or password' });
	    }
  	});

  	return deferred.promise;
}

function _passwordChange(password, id){
	var deferred = global.q.defer();
	var query = global.connection.query('UPDATE user SET password='+global.connection.escape(password)+' WHERE username = ' + global.connection.escape(id), function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;
}

function _passwordCheck(password, id){
	var deferred = global.q.defer();
	var query = global.connection.query('SELECT COUNT(*) AS count FROM user WHERE username = ' + global.connection.escape(id) + ' AND password = '+ global.connection.escape(password), function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    if(result[0].count > 0)
	    	deferred.resolve(true);
	    else
	    	deferred.resolve(false);
  	});
	return deferred.promise;
}

function _addNewUser(data){

	var deferred = global.q.defer();

	var post = {};
	post.id = data.id;
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
	post.password = data.password;

	var query = global.connection.query('INSERT INTO user SET ?', post, function(err, result) {
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
	var query = global.connection.query('UPDATE user SET username = '+global.connection.escape(data.username)+', name ='+global.connection.escape(data.name)+', email='+global.connection.escape(data.email)+', type="'+ type.toString() +'", department='+global.connection.escape(data.department)+', mobile='+global.connection.escape(data.mobile)+' WHERE id = ' + global.connection.escape(data.id), function(err, result) {
	    if(err)
	    	deferred.reject(err);

	    deferred.resolve(result);
  	});

	return deferred.promise;

}

function _deleteUser(id){

	var deferred = global.q.defer();
	var query = global.connection.query('DELETE FROM user WHERE id = ' + global.connection.escape(id), function(err, result) {
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

function _isAdmin(username){

	var deferred = global.q.defer();
	var query = global.connection.query('SELECT COUNT(*) AS count FROM user WHERE username = ' + global.connection.escape(username) + ' AND type = "admin"', function(err, result) {
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
	var query = global.connection.query('SELECT username, name, email, type, mobile, department, id FROM user', function(err, result) {
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