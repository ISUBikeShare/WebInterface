var Transaction = require('../models/transaction');
var Dock = require('../models/dock');
var Bike = require('../models/bike');
var Admin = require('../models/admin');
var API = new Object();

function save(req, res) {
	// TODO
    var transaction = new Transaction(); 		// create a new instance of the Transaction model
    transaction.bikeID = req.body.bikeID;  		// set the transaction bikeId (comes from the request) number
    transaction.dockID = req.body.dockID; //set the transaction dockID (comes from the request) number
    transaction.studentID = req.body.studentID; //set the tranaction studentID (comes from the request) number
    transaction.action = req.body.action;		//sets the action of the transaction (comes from the request) string
    transaction.success = req.body.success;		// returns whether or not the transaction was a success (bool)


    // save the transaction and check for errors
    transaction.save();

}

API.checkOut = function (req, res) {
	// TODO
    //Get string data from card and send to other API - get studentID back
    //Look up if student currently has another bike out
    //If yes, do not unlock (return 401)
    //If no, allow bike to be checked out and unlock
    // ** Create Transaction **
    // (return 200)
};

API.checkIn = function (req, res) {
	// TODO
    //Update dock to contain a bike
    //Remove bike from studentID
    //** Create Transaction **
    //(return 200)

};

API.register = function (req, res) {
	// TODO
};

API.createDock = function (req, res) {
	//find largest dockID
	Dock.findOne().sort('-dockID').select('dockID').exec(function (err, object) {
		//callback function to create dock
		var dock = new Dock();
		dock.location = null;
		dock.bikeID = null;
		dock.dockID = object == null ? 1 : ++object.dockID;
		dock.status = true;
		dock.save(function(err) {
			//callback function to handle response
			if (err) res.send(err);
	
			res.sendStatus(200);
		});
	});
};

API.findDockStatus = function (req, res) {
	var dockID = req.body.dockID;
	//Need to talk to PI people on the best way to tackle this.
};

API.setDockLocation = function (req, res) {
	// TODO
	var dockID = req.body.dockID;
	var location = req.body.location;
	Dock.update({dockID: dockID}, {location: location}, function (err) {
		//callback function to handle response
		if (err) res.send(err);
	
		res.sendStatus(200);
	});
};

API.createBike = function (req, res){
	//find largest bikeID
	Bike.findOne().sort('-bikeID').select('bikeID').exec(function (err, object) {
		//callback function to create bike
		var bike = new Bike();
		bike.isDamaged = false; //FIX BOOLEAN
		bike.state = 'in'; 		//FIX ENUM
		bike.dockID = null;
		bike.bikeID = object == null ? 1 : ++object.bikeID;
		bike.save(function(err) {
			//callback function to handle response
			if (err) res.send(err);
	
			res.sendStatus(200);
		});
	});
};

API.setBikeDamage = function (req, res){
	var isDamaged = req.body.isDamaged;
	var bikeID = req.body.bikeID;
	Bike.update({bikeID: bikeID}, {isDamaged: isDamaged}, function (err) {
		//callback function to handle response
		if (err) res.send(err);
	
		res.sendStatus(200);
	});
};

API.createAdmin = function (req, res){
	var admin = new Admin();
	admin.cardString = req.body.cardString;
	admin.save(function(err) {
		if (err) res.send(err);
	
		res.sendStatus(200);
	});
};

API.removeAdmin = function (req, res){
	var cardString = req.body.cardString;
	Admin.findOneAndRemove({'cardString': cardString}, function (err) {
		if (err) res.send(err);
		
		res.sendStatus(200);
	});
};

API.findAllAdmins = function (req, res){
	Admin.find(function(err, admins) {
		if (err) res.send(err);
			
		res.json(admins);
	})
};

API.findBikeById = function (req, res){
	var bikeID = req.params.bikeID;
	Bike.where({ bikeID: bikeID}).findOne(function(err, bike) {
		if (err) res.send(err);
			
		res.json(bike);
	});
};

API.findDockById = function (req, res){
	var dockID = req.params.dockID;
	Dock.where({dockID: dockID}).findOne(function(err, dock) {
		if (err) res.send(err);
			
		res.json(dock);
	});
};

API.findAllTransactions = function(req, res){
    Transaction.find(function(err, transactions) {
		if (err)
			res.send(err);

		res.json(transactions);
	});
};

API.findTransactionsByParamId = function(req, res){

};

//Method used for debugging purposes
API.blowitup = function (req, res){
	Bike.collection.remove(function () { console.log("Bike collection went Boom")});
	Dock.collection.remove(function () { console.log("Dock collection is now exploded")});
	Transaction.collection.remove(function () { console.log("Transaction collection? More like TNT collection")});
	Admin.collection.remove(function () { console.log("Admin collection went kaboom")});
	res.sendStatus(200);
};

module.exports = API;