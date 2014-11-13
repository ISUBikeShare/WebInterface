// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    	= require('express'); 		// call express
var app        	= express(); 				// define our app using express
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var router		= require('./app/routes/router');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app/public/views'));
app.use(express.static(__dirname + '/app/public/controllers'));
app.use(express.static(__dirname + '/node_modules/angular'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

//MongoDB connection
mongoose.connect('mongodb://localhost/test');

var port = process.env.PORT || 8080; 		// set our port
	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Application running on port:  ' + port);