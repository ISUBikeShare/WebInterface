/*
 * This creates the schema for our Dock model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dockSchema = new Schema({
	dockID: String,
	location: String,
	bikeID: Number,
	status: Boolean
});

module.exports = mongoose.model('Dock', dockSchema);