var Transaction = require('../models/transaction');
var API = new Object();

API.findAll = function(req, res){
	Transaction.find(function(err, transactions) {
		if (err)
			res.send(err);
			
		res.json(transactions);
	});
}

API.save = function(req, res){
	var transaction = new Transaction(); 		// create a new instance of the Transaction model
	transaction.bikeID = req.body.bikeID;  		// set the transaction bikeId (comes from the request) number
	transaction.stationID = req.body.stationID; //set the transaction stationID (comes from the request) number
	transaction.studentID = req.body.studentID; //set the tranaction studentID (comes from the request) number
	transaction.action = req.body.action;		//sets the action of the transaction (comes from the request) string
	transaction.damaged = req.body.damaged;		//sets the transaction state of the bike (comes from the request) bool
	
	// save the transaction and check for errors
	transaction.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Transaction created!' });
	});
}

API.findAllByBikeID = function(req, res) {
	Transaction.where({ bikeID: req.params.bikeid}).find(function (err, transactions)	{
		if (err)
			res.send(err);
			
		res.json(transactions);
	});
}

API.findAllByStationID = function(req, res) {
	Transaction.where({ stationID: req.params.stationid}).find(function (err, transactions)	{
		if (err)
			res.send(err);
			
		res.json(transactions);
	});
}

API.findAllByStudentID = function(req, res) {
	Transaction.where({ studentID: req.params.studentid}).find(function (err, transactions)	{
		if (err)
			res.send(err);
			
		res.json(transactions);
	});
}

API.findAllByDamaged = function(req, res) {
	Transaction.where({ damaged: req.params.damaged}).find(function (err, transactions)	{
		if (err)
			res.send(err);
			
		res.json(transactions);
	});
}

API.findAllByAction = function(req, res) {
	Transaction.where({ action: req.params.action}).find(function (err, transactions)	{
		if (err)
			res.send(err);
			
		res.json(transactions);
	});
}

module.exports = API;