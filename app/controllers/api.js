var Transaction = require('../models/transaction');
var Dock = require('../models/dock');
var Bike = require('../models/bike');
var Admin = require('../models/admin');
var ErrorReport = require('../models/errorReport');
var API = new Object();

/*
    Application methods
*/

API.checkOut = function (req, res) {
    var cardString = req.body.cardString;
    var dockID = req.body.dockID;
    var bikeID = req.body.bikeID;
    //check for already checked out bike
    Bike.findOne({cardString: cardString}, function (err, bike) {
    //null if no bike exists
    var validTransaction = bike == null;
    Transaction.findOne().sort('-transactionID').select('transactionID').exec(function (err, object) {
        if (err) {
            createErrorReport(err, null, 'Server');
            res.sendStatus(500);
            return;
        }
        var transaction = new Transaction();
        transaction.bikeID = bikeID;
        transaction.dockID = dockID;
        transaction.studentID = cardString;
        transaction.action = 'out';
        transaction.transactionID = object == null ? 1 : ++object.transactionID;
        transaction.success = validTransaction;
        transaction.save(function(err) {
            //callback function to handle response
            if (err) {
                createErrorReport(err, null, 'Server');
                res.sendStatus(500);
                return;
            } else if (validTransaction) {
                res.sendStatus(200);
                Dock.findOneAndUpdate({dockID: dockID}, {bikeID: null}, function(err) {
                    if (err) {
                        createErrorReport(err, null, 'Server');
                        res.sendStatus(500);
                        return;
                    }
                });
                Bike.findOneAndUpdate({bikeID: bikeID}, {state: 'out', dockID: null, cardString: cardString}, function(err) {
                    if (err) {
                        createErrorReport(err, null, 'Server');
                        res.sendStatus(500);
                        return;
                    }
                });
            } else {
                res.sendStatus(400);
                return;
            }
        });
    });
  });
};

API.checkIn = function (req, res) {
    var dockID = req.body.dockID;
    var bikeID = req.body.bikeID;
    var cardString = null;
    //Mark transaction as a failure if we get an invalid bikeID back (i.e. NFC tag is damaged)
    var validTransaction = !(bikeID == null || bikeID == undefined);
    //Get the card string of the bike being checked in
    Bike.where({bikeID: bikeID}).findOne(function (err, bike) {
        if(bike != null) cardString = bike.cardString;
        //Create a new Transaction
        Transaction.findOne().sort('-transactionID').select('transactionID').exec(function (err, object) {
            var transaction = new Transaction();
            transaction.bikeID = bikeID;
            transaction.dockID = dockID;
            transaction.studentID = cardString;
            transaction.action = 'in';
            transaction.transactionID = object == null ? 1 : ++object.transactionID;
            transaction.success = validTransaction;
            transaction.save(function(err) {
                if (err) {
                    createErrorReport(err, null, 'Server');
                    res.sendStatus(500);
                    return;
                }
                //Update Dock
                Dock.findOneAndUpdate({dockID: dockID}, {bikeID: bikeID, state: 'in', status: validTransaction}, function(err) {
                    if (err) {
                        createErrorReport(err, null, 'Server');
                        res.sendStatus(500);
                        return;
                    }
                });
                //Update Bike
                Bike.findOneAndUpdate({cardString: cardString}, { dockID: dockID, state: 'in', isDamaged: !validTransaction, cardString: null}, function(err, bike) {
                    if (err) {
                        createErrorReport(err, null, 'Server');
                        res.sendStatus(500);
                        return;
                    }
                });
            });
        });
        res.sendStatus(200);
    });
};


/*
    Transaction methods
*/

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

/*
    Bike methods
*/

API.createBike = function (req, res) {
    var bike = new Bike();
    bike.isDamaged = false;
    bike.state = 'in';
    if (req.body.dockID == null)
        bike.state = 'out';
    bike.dockID = req.body.dockID ? req.body.dockID : null;
    bike.bikeID = req.body.bikeID;
    bike.cardString = null;
    Bike.find({ bikeID: req.body.bikeID}, function (err, existingBike) {
        if(existingBike.length){
            createErrorReport('The bikeID ' + req.body.bikeID + ' already exists', null, 'Server');
            res.sendStatus(500);
        }

        else
        {
            bike.save(function (err) {
                if (err) {
                    createErrorReport(err, null, 'Server');
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    })
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

API.updateBike = function (req, res){
    var bikeID = req.params.bikeID;
    var isDamaged = req.body.isDamaged;
    var cardString = req.body.cardString != null ? req.body.cardString : null;
    var state = req.body.state;
    var dockID = req.body.dockID ? req.body.dockID : '';
    Bike.update({bikeID: bikeID}, {isDamaged: isDamaged, state: state, dockID: dockID, cardString: cardString}, function (err) {
        if (err) {
            createErrorReport(err, null, 'Server');
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
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

/*
    Dock methods
*/

API.createDock = function (req, res) {
    var dock = new Dock();
    dock.location = req.body.location ? req.body.location : null;
    dock.dockID = req.body.dockID;
    dock.bikeID = req.body.bikeID ? req.body.bikeID : null;
    dock.status = true;

    Dock.find({ dockID: req.body.dockID}, function (err, existingDock) {
        if(existingDock.length){
            createErrorReport('The dockID ' + req.body.dockID + ' already exists', null, 'Server');
            res.sendStatus(204);
        }

        else
        {
            dock.save(function (err) {
                if (err) {
                    createErrorReport(err, null, 'Server');
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    })
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

API.updateDock = function (req, res) {
    var dockID = req.params.dockID;
    var location = req.body.location;
    var bikeID = req.body.bikeID ? req.body.bikeID : '';
    var status = req.body.status;
    Dock.update({dockID: dockID}, {location: location, bikeID: bikeID, status: status}, function (err) {
        if (err) {
            createErrorReport(err, null, 'Server');
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
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

/*
    Admin methods
*/

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

/*
    Error Report methods
*/

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
    //clear all data
    Bike.collection.remove(function () { console.log("Bike collection went Boom")});
    Dock.collection.remove(function () { console.log("Dock collection is now exploded")});
    Transaction.collection.remove(function () { console.log("Transaction collection? More like TNT collection")});
    Admin.collection.remove(function () { console.log("Admin collection went kaboom")});
    ErrorReport.collection.remove(function () { console.log("Now thats an error")});
    //create a bike in a dock
    var bike = new Bike();
    bike.isDamaged = false;
    bike.state = 'in';
    bike.dockID = "202481599488101";
    bike.bikeID = "6A004A1589BC";
    bike.cardString = null;
    bike.save(function (err) { if(err) res.send(err)});
    var bike = new Bike();
    bike.isDamaged = false;
    bike.state = 'out';
    bike.dockID = null;
    bike.cardString = null;
    bike.bikeID = "6A0049EE509D";
    bike.save(function (err) { if(err) res.send(err)});
    //create a dock with a bike in it
    var dock = new Dock();
    dock.location = "Friley Hall";
    dock.bikeID = "6A004A1589BC";
    dock.dockID = "202481599488101";
    dock.status = true;
    dock.save(function (err) { if(err) res.send(err)});

/**
    var dock = new Dock();
    dock.location = "Maple Willow Larch";
    dock.bikeID = "6A0049EE509D";
    dock.dockID = "2";
    dock.status = true;
    dock.save(function (err) { if(err) res.send(err)});
*/
    res.sendStatus(200);
};

module.exports = API;
