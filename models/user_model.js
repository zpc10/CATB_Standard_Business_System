var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var user_schema = new Schema({

    CODE: String,
    NAME: String,
    FIRSTNAME: String,
    LASTNAME: String,
    PASSWORD: String,
    EMAIL: String,
    PHONE: String,
    STATUS: {
        type: String,
        default: "disable"
    },
    CREATE_TIME: Date

});

var user_model = mongoose.model("sys_user", user_schema);

module.exports = user_model;