var http = require('http');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
global.moment = require('moment');
global.tz = require('moment-timezone');
tz().tz("Asia/Kolkata").format();
global.q = require('q');
global.config = require('./config');

app = express();
app.use(cors());
app.use(express.static(__dirname + '/code'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


//DB connection
var mysql = require('mysql');
global.connection = mysql.createConnection({
    		  host     : process.env.HOST,
			  user     : process.env.USER,
			  password : process.env.PASSWORD,
			  database : process.env.DB		
            });

app.listen(process.env.PORT || 8100, function(req,res){
    //TODO: replace console log with loggly
    _loadServices();
    console.log('service loaded');

    _loadAPIs();
    console.log('apis loaded');
    
    global.connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });

    global.connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
        }
    });

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