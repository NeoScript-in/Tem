var jwt = require('jsonwebtoken');
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

        adminAuthentication: function(req, res, next){
            var bearerToken;
            var bearerHeader = req.body.token;
            if (typeof bearerHeader !== 'undefined') {
                var bearer = bearerHeader.split(" ");
                bearerToken = bearer[1];
                req.username = bearerToken;
                global.userService.isAdmin(req.username).then(function(result){
                    next();
                },function(err){
                    res.status(401).send('UnAuthorized');
                });
                
            } else {
                res.status(401).send('Please Login');
            }
        },

        userAuthentication: function(req, res, next){
            
            if (typeof req.body.token !== 'undefined') {
                try{
                    req.username = jwt.verify(req.body.token,global.config.jwtKey);
                }catch(e){
                    res.status(401).send('UnAuthorized');
                }
                global.userService.userExist(req.username).then(function(result){
                    next();
                },function(err){
                    res.status(401).send('UnAuthorized');
                });
                
            } else {
                res.status(401).send('Please Login');
            }
        },

        createJWT: function(payload){
            var token = jwt.sign(payload, global.config.jwtKey);
            return token;
        }
    };
    return obj;
};