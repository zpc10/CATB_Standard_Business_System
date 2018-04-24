"use strict";
const config = require('./config');
const Hapi = require('hapi');
// Create a server with a host and port
const server=Hapi.server({
    host:config.server.host,
    port:config.server.port
});

const plugins=require('./config_plugin');

//Register all plugins
server.register(plugins, function (err) {
    if (err) {
        throw err; // something bad happened loading a plugin
    }
});
const route=require('../routes');

// Add the server routes
route.forEach(function(api){
    server.route(api);
});


// Export the server to be required elsewhere.
module.exports = server;