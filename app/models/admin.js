/*
 * This creates the schema for our Admin model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    cardString: Number
});

module.exports = mongoose.model('Admin', adminSchema);