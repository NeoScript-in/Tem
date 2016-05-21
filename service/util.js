module.exports = function(){
    var obj = {
        generateId: function(){
            var id = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (i = 0; i < 8; i++) {
                id = id + possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return id;
        },

        adminAuthentication: function(){
            return true;
        },

        userAuthentication: function(){
            return true;
        },

        createJWT: function(username){
            return "1234";
        }
    };
    return obj;
};