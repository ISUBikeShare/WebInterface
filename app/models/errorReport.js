/*
 * This creates the schema for our error model
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var errorReportSchema = new Schema({
    stackTrace: String,
    dockID: String,
    date: {type: Date, default: Date.now},
    type: {type: String, enum: ['Server', 'Client']}
});

module.exports = mongoose.model('ErrorReport', errorReportSchema);