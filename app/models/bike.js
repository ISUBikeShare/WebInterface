/*
 * This creates the schema for our Bike model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bikeSchema = new Schema({
    bikeID: String,
    dockID: String,
    cardString: String,
    state: {type: String, enum: ['in', 'out', 'maintenance']},
    isDamaged: Boolean
});

module.exports = mongoose.model('Bike', bikeSchema);