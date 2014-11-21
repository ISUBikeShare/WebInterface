/*
 * This creates the schema for our transaction model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	bikeID: Number,
	dockID: Number,
	studentID: Number,
	date: {type: Date, default: Date.now},
	action: String,
	success: Boolean
});

module.exports = mongoose.model('Transaction', transactionSchema);