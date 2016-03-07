var http = require('http');
var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Rnh174',
  database : 'tem'
});

app = express();
app.use(cors());
app.use(express.static(__dirname + '/code'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 8100, function(req,res){
    connection.connect();
    console.log('database connected');
    console.log('server started');
});

function createJWT(argument) {
  return "12334";
}

function adminAuthentication(){
  return true;
}

function userAuthentication(){
  return true;
}

function firstHalf(){
  var currentDate = new Date();
  var currentDay = currentDate.getDate();
  if(currentDay <= 15){
    return true;
  }else {
    return false;
  }
}

app.post('/login', function(req, res) {
  var userName = req.body.username;
  var password = req.body.password;
  var admn = false;
  if(req.body.admin){
    admin = true;
  }
  //TODO: fetch user info from DB and compare
  if(userName === "ranjeet" && password === "1234" && admin === true){
    var token = createJWT(userName);
    return res.send({ token: token, userName: "ranjeet", admin: true  });
  }else {
    return res.status(401).send({ message: 'Wrong email and/or password' });
  }
});

app.get('/user/list', adminAuthentication, function(req, res) {

});

app.put('/user/update', adminAuthentication, function(req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  var admin = false;
  if(req.body.admin){
    admin = true;
  }
  if(req.body.username){
    //user exists.. update new changes
    var userName = req.body.username;
  }else {
    //user does not exists.. add new user
  }

  //TODO: add/update data to DB
  return res.send({ message: "" });
});

app.delete('/user/delete', adminAuthentication, function(req, res) {
  return res.send({ message: "" });
});

app.post('/password/check', userAuthentication, function(req, res) {
  return res.send({ message: "" });
});

app.post('/password/change', userAuthentication, function(req, res) {
  return res.send({ message: "" });
});

app.get('/booking/advance', userAuthentication, function(req, res) {

   if (firstHalf()) {
     //TODO: send booking status of firstHalf of month
     return res.send({ data: "" });
   }else {
     //TODO: send booking status of secondHalf of month
     return res.send({ data: "" });
   }


});

app.get('/booking/current', userAuthentication, function(req, res) {
  if (firstHalf()) {
    //TODO: send 2 days booking status of firstHalf of month
    return res.send({ data: "" });
  }else {
    //TODO: send 2 days booking status of secondHalf of month
    return res.send({ data: "" });
  }
  return res.send({ message: "" });
});

app.get('/booking/cancel', userAuthentication, function(req, res) {
  //send cuurently booked slots of a user
  return res.send({ message: "" });
});

app.post('/booking/advance', userAuthentication, function(req, res) {

  return res.send({ message: "" });
});

app.post('/booking/current', userAuthentication, function(req, res) {

  return res.send({ message: "" });
});

app.post('/booking/cancel', userAuthentication, function(req, res) {
  return res.send({ message: "" });
});
