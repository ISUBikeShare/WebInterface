// ROUTES FOR OUR API
// =============================================================================
var express    	= require('express'); 		// call express
var router		= express.Router(); 		// get an instance of the express Router
var API 		= require('../controllers/api');

router.use(function(req, res, next) {
	console.log('HTTP request received with params: ' + JSON.stringify(req.body));
	next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here
router
	//Go to home page
	.get('/view/index', function(req, res) {
		res.sendFile(__dirname + '/app/views/index.html');
	})
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
	
module.exports = router;