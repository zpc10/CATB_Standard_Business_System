var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var resource_schema = new Schema({
    UNITS: String,
    VALUE: String,
    CURL: String,
    RTYPE: String,
    OWNERID: String,
    OWNERENTITY: String,
    DESC: String,
    CREATE_TIME:Date
});

var resource_model = mongoose.model("sys_resource", resource_schema);

module.exports = resource_model;