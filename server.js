var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
global.q = require('q');
global.connection = require('./connection/mysql.js')();

app = express();
app.use(cors());
app.use(express.static(__dirname + '/code'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 8100, function(req,res){
    
    _loadServices();
    console.log('service loaded');

    _loadAPIs();
    console.log('apis loaded');
    
    global.connection.connect();
    console.log('database connected');

    console.log('server started listening at port 8100');
});


function _loadAPIs(){
    require('./api/user.js')();
    require('./api/booking.js')();
    require('./api/settings.js')();
};


function _loadServices(){
    global.util = require('./service/util.js')();
    global.userService = require('./service/user.js')();
    global.bookingService = require('./service/booking.js')();
    global.settingService = require('./service/settings.js')();
};