module.exports = function(){

	global.app.put('/holiday/add', function(req, res){

		var date = req.body.date;
		var reason = req.body.reason;
		global.settingService.holidayAdd(date, reason).then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });

	});

	global.app.post('/holiday/remove', function(req, res){

		var date = req.body.date;
		global.settingService.holidayRemove(date).then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });
	});

	global.app.get('/holiday/list', function(req, res) {
		global.settingService.holidayList().then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });
	});

	global.app.post('/advancebookingsettings/save', function(req, res){

		var data = {};
		data = req.body;
		global.settingService.advSettingUpsert(data).then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });
	});

	global.app.get('/advancebookingsettings/list', function(req, res){
		
		global.settingService.advSettingList().then(function(result){
            res.status(200).send(result);
        },function(err){
            res.status(500).send(err);
        });
	});
};