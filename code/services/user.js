app.factory('userService',function($http, $q){
    return {
        userType: function(){
          var val = localStorage.getItem('admin');
          if(val === "true")
            return true;
          else
            return false;
        },

        saveUser: function(data){
          data.token = localStorage.getItem('token');
          return $http.put("/user/update", data);
        },

        removeUser: function(id){
          var data = {};
          data.id = id;
          data.token = localStorage.getItem('token');
          return $http.post("/user/delete/", data);
        },
        userList: function(){
          return $http.get("/user/list");
        },

        login: function(username, password, admin){
          var data = {};
          data.username = username;
          data.password = password;
          data.admin = admin;
          return $http.post("/login", data);

        },

        passwordVerify: function(password){
          var data = {};
          data.password = password;
          data.token = localStorage.getItem('token');
          return  $http.post("/password/check", data);
        },

        passwordChange: function(password){
          var data = {};
          data.password = password;
          data.token = localStorage.getItem('token');
          return  $http.post("/password/change", data);
        },

        isLoggedIn: function(){
            var token = localStorage.getItem('token');
            if(token){
                return true;
            }else{
                return false;
            }
        },
    };
});
