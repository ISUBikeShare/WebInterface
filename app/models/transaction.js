var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	bikeID: Number,
	stationID: Number,
	studentID: Number,
	date: {type: Date, default: Date.now},
	action: String,
	damaged: Boolean
});

module.exports = mongoose.model('Transaction', transactionSchema);