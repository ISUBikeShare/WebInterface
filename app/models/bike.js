/*
 * This creates the schema for our Bike model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeSchema = new Schema({
	bikeID: Number,
	dockID: Number,
    cardString: Number,
	state: {type: String, enum: ['in', 'out', 'maintenance']},
	isDamaged: Boolean
});

module.exports = mongoose.model('Bike', bikeSchema);