// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Transaction = require('./app/models/transaction');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MongoDB connection
mongoose.connect('mongodb://localhost/test');

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.use(function(req, res, next) {
	// do logging
	console.log('HTTP request received with params: ' + JSON.stringify(req.body));
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
/**
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

*/

// more routes for our API will happen here
router//.route('/transactions')

	// create a transaction (accessed at POST http://localhost:8080/api/save)
	.post('/save', function(req, res) {
		
		var transaction = new Transaction(); 		// create a new instance of the Transaction model
		transaction.bikeID = req.body.bikeID;  		// set the transaction bikeId (comes from the request)
		transaction.stationID = req.body.stationID; //set the transaction stationID (comes from the request)
		transaction.studentID = req.body.studentID; //set the tranaction studentID (comes from the request)
		transaction.action = req.body.action;		//sets the action of the transaction (comes from the request)
		transaction.damaged = req.body.damaged		//sets the transaction state of the bike (comes from the request)
		
		// save the transaction and check for errors
		transaction.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Transaction created!' });
		});
		
	})
	// get all the transactions (accessed at GET http://localhost:8080/api/findall)
	.get('/findall', function(req, res) {
		Transaction.find(function(err, transactions) {
			if (err)
				res.send(err);

			res.json(transactions);
		});
	})
	// get all transactions with the given bikeID
	.get('/findallbybikeid/:bikeid', function(req, res) {
		Transaction.where({ bikeID: req.params.bikeid}).find(function (err, transactions)	{
			if (err)
				res.send(err);
				
			res.json(transactions);
		})
	})
	// get all transactions with the given stationID
	.get('/findallbystationid/:stationid', function(req, res) {
		Transaction.where({ stationID: req.params.stationid}).find(function (err, transactions)	{
			if (err)
				res.send(err);
				
			res.json(transactions);
		})
	})
	// get all transactions with the given studentID
	.get('/findallbystudentid/:studentid', function(req, res) {
		Transaction.where({ studentID: req.params.studentid}).find(function (err, transactions)	{
			if (err)
				res.send(err);
				
			res.json(transactions);
		})
	})
	
	
	
	;

	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Application running on port:  ' + port);