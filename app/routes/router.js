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
	// create a transaction (accessed at POST http://localhost:8080/api/checkOut)
	.post('/checkout', function(req, res) {
        API.checkOut(req, res);
	})

    // create a transaction (accessed at POST http://localhost:8080/api/checkIn)
	.post('/checkin', function(req, res) {
        API.checkIn(req, res);
	})

    // registers a dock (accessed at POST http://localhost:8080/api/register)
    .post('/register', function (req, res){

    })

    //create a new dock (accessed at POST http://localhost:8080/api/createdock)
    .post('/createdock', function(req, res){
        API.createDock(req, res);
    })

    // gets the status of a dock (accessed at POST http://localhost:8080/api/finddockstatus)
    .get('/finddockstatus', function(req, res) {
        API.findDockStatus(req, res);

    })
    // sets the dock the location of the dock (accessed at POST http://localhost:8080/api/setdocklocation)
    .post('/setdockloaction', function (req, res) {
        API.setDockLocation(req, res);
    })

    // Creates a bike (accessed at POST http://localhost:8080/api/createbike)
    .post('/createbike', function (req, res) {
        API.createBike(req, res);
    })

    // Sets the damage of a bike (accessed at POST http://localhost:8080/api/setbikedamage)
    .post('/setbikedamage', function (req, res){
        API.setBikeDamage(req, res);
    })

    //Creates a new admin (accessed at POST http://localhost:8080/api/createadmin)
    .post('/createadmin', function (req, res) {
        API.createAdmin(req, res);
    })

    //Removes an admin from the system (accessed at POST http://localhost:8080/api/removeadmin)
    .post('/removeadmin', function (req, res){
        API.removeAdmin(req, res);
    })

    // gets all the admins in the system (accessed at POST http://localhost:8080/api/findalladmins)
    .get('/findalladmins', function (req, res) {
        API.findAllAdmins(req, res);
    })

    // gets a bike in the system by the bike id (accessed at POST http://localhost:8080/api/findbikebyid)
    .get('/findbikebyid', function (req, res) {
        API.findBikeById(req, res);
    })

    // gets the dock by id (accessed at POST http://localhost:8080/api/finddockbyid)
    .get('/finddockbyid', function (req, res){
        API.findDockById(req, res);
    })

    // gets all the transactions (accessed at POST http://localhost:8080/api/getalltransactions)
    .get('/findalltransactions', function (req, res){
        API.findAllTransactions(req, res);
    })

    // gets all the transactions based on the given parameter (e.g. studentId, bikeid, etc. (accessed at POST http://localhost:8080/api/findalltranactionsbyparamid)
    .get('/findalltransactionsbyparamid', function (req, res){
        API.findTransactionsByParamId(req, res)
    });

	
module.exports = router;