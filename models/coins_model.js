var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var coins_schema = new Schema({

    VALUE: String,
    OWNERID: String,
    OWNERENTITY: String,
    DESC: String,
    CREATE_TIME: Date

});

var coins_model = mongoose.model("sys_coins", coins_schema);

module.exports = coins_model;