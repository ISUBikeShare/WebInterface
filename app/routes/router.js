// ROUTES FOR OUR API
// =============================================================================
var express = require('express'); 		// call express
var router = express.Router(); 		// get an instance of the express Router
var API = require('../controllers/api');

router.use(function(req, res, next) {
    console.log('HTTP request received with params: ' + JSON.stringify(req.body));
    next(); // make sure we go to the next routes and don't stop here
});

router
    //Go to home page
    .get('/view/index', function(req, res) {
        res.sendFile(__dirname + '/app/views/index.html');
    })
	
	/*
		Application Endpoints
	*/
	.get('/blowitup', function(req, res){
        API.blowitup(req, res);
    })
    .get('/setupdemo', function(req, res) {
        API.setupDemo(req, res);
    })
    .post('/checkout', function(req, res) {
        API.checkOut(req, res);
    })
    .post('/checkin', function(req, res) {
        API.checkIn(req, res);
    })	
	/*
		Bike Endpoints
	*/
	.get('/bike/', function (req, res) {
        API.findAllBikes(req, res);
    })
    .post('/bike/', function (req, res) {
        API.createBike(req, res);
    })
	.get('/bike/:bikeID', function (req, res) {
        API.findBikeById(req, res);
    })
	.put('/bike/:bikeID', function (req, res) {
        API.updateBike(req, res);
    })
	/*
		Dock Endpoints
	*/
	.get('/dock/', function(req, res){
        API.findAllDocks(req, res);
    })
	.post('/dock/', function(req, res){
        API.createDock(req, res);
    })
	.get('/dock/:dockID', function (req, res){
        API.findDockById(req, res);
    })
	.put('/dock/:dockID', function (req, res) {
        API.updateDock(req, res);
    })
	/*
		Transaction Endpoints
	*/
	
	.get('/transaction/', function (req, res){
        API.findAllTransactions(req, res);
    })
	/*
		Error Report Endpoints
	*/
	.get('/errorreport/:dockID', function (req, res){
        API.findErrorReportsByDockID(req, res);
    })
    .post('/errorreport/', function (req, res){
        API.createErrorReport(req, res);
    })
	.get('/errorreport/', function (req, res){
        API.findAllErrorReports(req, res)
    })	
	/*
		Admin - we can probably remove these....
	*/
    .post('/admin/', function (req, res) {
        API.createAdmin(req, res);
    })
    .get('/admin/', function (req, res) {
        API.findAllAdmins(req, res);
    })
	.delete('/admin/:cardString', function (req, res){
        API.removeAdmin(req, res);
    });

module.exports = router;