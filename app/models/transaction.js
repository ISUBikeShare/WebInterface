/*
 * This creates the schema for our transaction model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	transactionID: Number,
	bikeID: Number,
	dockID: String,
	studentID: Number,
	date: {type: Date, default: Date.now},
	action: {type: String, enum: ['in', 'out']},
	success: Boolean
});

module.exports = mongoose.model('Transaction', transactionSchema);