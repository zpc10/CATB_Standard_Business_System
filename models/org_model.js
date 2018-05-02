var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var org_schema = new Schema({

    CODE: String,
    NAME: String,
    COINS: String,
    CASH: String,
    DESC: String,
    CREATE_TIME: Date

});

var org_model = mongoose.model("sys_org", org_schema);

module.exports = org_model;