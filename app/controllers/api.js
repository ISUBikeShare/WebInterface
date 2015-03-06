var Transaction = require('../models/transaction');
var Dock = require('../models/dock');
var Bike = require('../models/bike');
var Admin = require('../models/admin');
var ErrorReport = require('../models/errorReport');
var API = new Object();

API.checkOut = function (req, res) {
    //Get string data from card and send to other API - get studentID back
    var cardString = req.body.cardString;
    var dockID = req.body.dockID;
    var bikeID = req.body.bikeID;

    //Look up if student currently has another bike out
    Dock.findOne({ dockID: dockID}, function(err, dock) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		}
        Transaction.findOne().sort('-transactionID').select('transactionID').exec(function (err, object) {
			if (err) {
				createErrorReport(err, null, 'Server');
				res.sendStatus(500);
			}
            //callback function to create transaction
            var transaction = new Transaction();
            transaction.bikeID = bikeID;
            transaction.dockID = dockID;
            transaction.studentID = cardString;
            transaction.action = 'out';
            transaction.transactionID = object == null ? 1 : ++object.transactionID;
            transaction.success = true;
            transaction.save(function(err) {
                //callback function to handle response
                if (err) {
					createErrorReport(err, null, 'Server');
					res.sendStatus(500);
				}
				Dock.update({dockID: dockID}, {bikeID: null}, function(err) {
					if (err) {
						createErrorReport(err, null, 'Server');
						res.sendStatus(500);
					}
				});
				Bike.update({bikeID: bikeID}, {state: 'out', dockID: null, cardString: cardString}, function(err) {
					if (err) {
						createErrorReport(err, null, 'Server');
						res.sendStatus(500);
					}
				});
		    });
        });
    });
};

API.checkIn = function (req, res) {
    var cardString = req.body.cardString;
    var dockID = req.body.dockID;
    var bikeID = req.body.bikeID;
    Bike.findOneAndUpdate({cardString: cardString}, { dockID: dockID, state: 'in'}, function(err, bike) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		}
        Transaction.findOne().sort('-transactionID').select('transactionID').exec(function (err, object) {
            //callback function to create transaction
            var transaction = new Transaction();
            transaction.bikeID = bikeID;
            transaction.dockID = dockID;
            transaction.studentID = cardString;
            transaction.action = 'in';
            transaction.transactionID = object == null ? 1 : ++object.transactionID;
            transaction.success = true;
            transaction.save(function(err) {
				if (err) {
					createErrorReport(err, null, 'Server');
					res.sendStatus(500);
				}
				Dock.update({dockID: dockID}, {state: 'in', bikeID: bikeID}, function(err) {
					if (err) {
						createErrorReport(err, null, 'Server');
						res.sendStatus(500);
					}
				});
		    });
        });
    });
};

API.createDock = function (req, res) {
	var dock = new Dock();
	dock.location = null;
	dock.dockID = req.body.dockID;
	dock.bikeID = req.body.bikeID;
	dock.status = true;
	dock.save(function(err) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
};

API.findDockStatus = function (req, res) {
	var dockID = req.body.dockID;
};

API.findAllDocks = function(req, res) {
	Dock.find(function(err, docks) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.json(docks);
		}
	})
};

API.setDockLocation = function (req, res) {
	var dockID = req.body.dockID;
	var location = req.body.location;
	Dock.update({dockID: dockID}, {location: location}, function (err) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
};

API.createBike = function (req, res){
	//find largest bikeID
	Bike.findOne().sort('-bikeID').select('bikeID').exec(function (err, object) {
		//callback function to create bike
		var bike = new Bike();
		bike.isDamaged = false; //FIX BOOLEAN
		bike.state = 'in'; 		//FIX ENUM
		bike.dockID = 1;
		bike.bikeID = object == null ? 1 : ++object.bikeID;
		bike.save(function(err) {
			if (err) {
				createErrorReport(err, null, 'Server');
				res.sendStatus(500);
			} else {
				res.sendStatus(200);
			}
		});
	});
};

API.findAllBikes = function (req, res) {
	Bike.find(function (err, bikes) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.send(bikes);
		}
	});
};

API.setBikeDamage = function (req, res){
	var isDamaged = req.body.isDamaged;
	var bikeID = req.body.bikeID;
	Bike.update({bikeID: bikeID}, {isDamaged: isDamaged}, function (err) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
};

API.createAdmin = function (req, res){
	var admin = new Admin();
	admin.cardString = req.body.cardString;
	admin.save(function(err) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
};

API.removeAdmin = function (req, res){
	var cardString = req.body.cardString;
	Admin.findOneAndRemove({'cardString': cardString}, function (err) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
};

API.findAllAdmins = function (req, res){
	Admin.find(function(err, admins) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.json(admins);
		}
	})
};

API.findBikeById = function (req, res){
	var bikeID = req.params.bikeID;
	Bike.where({ bikeID: bikeID}).findOne(function(err, bike) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.json(bike);
		}
	});
};

API.findDockById = function (req, res){
	var dockID = req.params.dockID;
	Dock.where({dockID: dockID}).findOne(function(err, dock) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.json(dock);
		}
	});
};

API.findAllTransactions = function(req, res){
    Transaction.find(function(err, transactions) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {
			res.json(transactions);
		}
	});
};

API.findTransactionsByParamId = function(req, res){

};

API.findAllErrorReports = function(req, res){
	ErrorReport.find(function(err, errorReports) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {	
			res.json(errorReports);
		}
	});
};

API.findErrorReportsByDockID = function(req, res) {
	var dockID = req.params.dockID;
	ErrorReport.where({dockID: dockID}).find(function(err, errorReports) {
		if (err) {
			createErrorReport(err, null, 'Server');
			res.sendStatus(500);
		} else {	
			res.json(errorReports);
		}
	});
};

API.createErrorReport = function(req, res) {
	createErrorReport(req.body.trace, req.body.dockID, 'Client');
	res.sendStatus(200);
};

function createErrorReport(trace, id, type){
	var errorReport = new ErrorReport();
	errorReport.stackTrace = trace;
	if(id != null) {
		errorReport.dockID = id;
	}
	errorReport.type = type;
	errorReport.save();
}

//Method used for debugging purposes
API.blowitup = function (req, res){
	Bike.collection.remove(function () { console.log("Bike collection went Boom")});
	Dock.collection.remove(function () { console.log("Dock collection is now exploded")});
	Transaction.collection.remove(function () { console.log("Transaction collection? More like TNT collection")});
	Admin.collection.remove(function () { console.log("Admin collection went kaboom")});
	ErrorReport.collection.remove(function () { console.log("Now thats an error")});
	res.sendStatus(200);
};

API.setupDemo = function(req, res) {
    Bike.collection.remove(function () { console.log("Bike collection went Boom")});
	Dock.collection.remove(function () { console.log("Dock collection is now exploded")});
	Transaction.collection.remove(function () { console.log("Transaction collection? More like TNT collection")});
	Admin.collection.remove(function () { console.log("Admin collection went kaboom")});

    Bike.findOne().sort('-bikeID').select('bikeID').exec(function (err, object) {
		//callback function to create bike
		var bike = new Bike();
		bike.isDamaged = false; //FIX BOOLEAN
		bike.state = 'in'; 		//FIX ENUM
		bike.dockID = 1;
		bike.bikeID = object == null ? 1 : ++object.bikeID;
		bike.save(function(err) {
			//callback function to handle response
			if (err) {
				createErrorReport(err, null, 'Server');
				res.sendStatus(500);
			}
		});
	});
    Dock.findOne().sort('-dockID').select('dockID').exec(function (err, object) {
		//callback function to create dock
		var dock = new Dock();
		dock.location = null;
		dock.bikeID = 1;
		dock.dockID = object == null ? 1 : ++object.dockID;
		dock.status = true;
		dock.save(function(err) {
			//callback function to handle response
			if (err) {
				createErrorReport(err, null, 'Server');
				res.sendStatus(500);
			}
		});
	});
}

module.exports = API;
