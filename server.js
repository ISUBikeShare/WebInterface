// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    	= require('express'); 		// call express
var app        	= express(); 				// define our app using express
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var API 		= require('./app/controllers/api');

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
	console.log('HTTP request received with params: ' + JSON.stringify(req.body));
	next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here
router//.route('/transactions')

	// create a transaction (accessed at POST http://localhost:8080/api/save)
	.post('/save', function(req, res) {
		API.save(req, res);
	})
	// get all the transactions (accessed at GET http://localhost:8080/api/findall)
	.get('/findall', function(req, res) {
		API.findAll(req, res);
	})
	// get all transactions with the given bikeID (accessed at GET http://localhost:8080/api/findallbybikeid/id_goes_here)
	.get('/findallbybikeid/:bikeid', function(req, res) {
		API.findAllByBikeID(req, res);
	})
	// get all transactions with the given stationID (accessed at GET http://localhost:8080/api/findallbystationid/id_goes_here)
	.get('/findallbystationid/:stationid', function(req, res) {
		API.findAllByStationID(req, res);
	})
	// get all transactions with the given studentID (accessed at GET http://localhost:8080/api/findallbystudentid/id_goes_here)
	.get('/findallbystudentid/:studentid', function(req, res) {
		API.findAllByStudentID(req, res);
	})
	// get all transactions with the given action  (accessed at GET http://localhost:8080/api/findallbyaction/action_goes_here)
	.get('/findallbyaction/:action', function(req, res) {
		API.findAllByAction(req, res);
	})
	// get all transactions with the given damage type (accessed at GET http://localhost:8080/api/findallbydamaged/damaged_boolean_goes_here)
	.get('/findallbydamaged/:damaged', function(req, res) {
		API.findAllByDamaged(req, res);
	});

	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Application running on port:  ' + port);