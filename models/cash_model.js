var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cash_schema = new Schema({

    VALUE: String,
    OWNERID: String,
    OWNERENTITY: String,
    DESC: String,
    CREATE_TIME: Date

});

var cash_model = mongoose.model("sys_cash", cash_schema);

module.exports = cash_model;