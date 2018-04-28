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

/*
var sys_user = new user_model({

    CODE: "dfsf",
    NAME: "dfsf",
    FIRSTNAME: "dfsf",
    LASTNAME: "dfsf",
    PASSWORD: "dfsf",
    EMAIL: "dfsf",
    PHONE: "dfsf",
    CREATE_TIME: new Date()
});

// user_model.create(sys_user,function (err) {
//     if(!err){
//         console.log("插入成功~~~");
//     }
// });

user_model.findOne({},function (err , doc) {
    if(!err){

        console.log(doc);

    }
});*/
