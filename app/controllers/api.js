var Transaction = require('../models/transaction');
var Dock = require('../models/bike');
var Bike = require('../models/dock');
var Admin = require('../models/admin');
var API = new Object();

function save(req, res) {
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
    //Get string data from card and send to other API - get studentID back
    //Look up if student currently has another bike out
    //If yes, do not unlock (return 401)
    //If no, allow bike to be checked out and unlock
    // ** Create Transaction **
    // (return 200)
};

API.checkIn = function (req, res) {
    //Update dock to contain a bike
    //Remove bike from studentID
    //** Create Transaction **
    //(return 200)

};

API.register = function (req, res) {

};

API.createDock = function (req, res) {


};

API.findDockStatus = function (req, res) {

};

API.setDockLocation = function (req, res) {

};

API.createBike = function (req, res){

};

API.setBikeDamage = function (req, res){

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

};

API.findDockById = function (req, res){

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

module.exports = API;