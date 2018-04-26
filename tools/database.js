'use strict';
// Dependencies
const Mongoose = require('mongoose');
// Configurations
const config = require('../config/config');

let db_url='mongodb://'+config.database.username+':'+config.database.password+'@'+config.database.host + ':' + config.database.port + '/' + config.database.db;


Mongoose.connect(db_url);

Mongoose.connection.on('error', console.error.bind(console, 'Connection error'));
Mongoose.connection.once('open', () => {
    console.log('Connection with database succeeded');
});
