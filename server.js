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
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
/**
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

*/

// more routes for our API will happen here
router.route('/transactions')

	// create a transaction (accessed at POST http://localhost:8080/api/transactions)
	.post(function(req, res) {
		
		var transaction = new Transaction(); 		// create a new instance of the Transaction model
		transaction.bikeID = req.body.bikeID;  // set the transaction bikeId (comes from the request)

		// save the transaction and check for errors
		transaction.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Transaction created!' });
		});
		
	})
		// get all the transactions (accessed at GET http://localhost:8080/api/transactions)
	.get(function(req, res) {
		Transaction.find(function(err, transactions) {
			if (err)
				res.send(err);

			res.json(transactions);
		});
	});

	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);