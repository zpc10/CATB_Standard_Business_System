"use strict";
const config = require('../config/config');
const Hapi = require('hapi');
// Create a server with a host and port
const server=Hapi.server({
    host:config.server.host,
    port:config.server.port
});

// Export the server to be required elsewhere.
module.exports = server;