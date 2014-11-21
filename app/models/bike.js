/*
 * This creates the schema for our Bike model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeSchema = new Schema({
	bikeID: Number,
	dockID: Number,
	state: String,
	isDamaged: Boolean
});

module.exports = mongoose.model('Bike', bikeSchema);