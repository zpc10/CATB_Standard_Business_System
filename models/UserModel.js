var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username:String
});

var User = mongoose.model('Users', UserSchema);

module.exports = User;