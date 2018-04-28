const Pack = require('../package');
const swaggerOptions = {
    info: {
        title: 'CATB_Standard_Business_System API Documentation',
        version: Pack.version,
    }
};

const sessionOptions={
    cookie: {
        isSecure: false // never set to false in production
    }
};

module.exports = [
    {
        plugin: require('hapi-auth-jwt2')
    },
    {
        plugin: require('inert')
    },
    {
        plugin: require('vision')
    },
    {
        plugin: require('hapi-swagger'),
        options: swaggerOptions
    },
    {
        plugin: require('hapi-server-session'),
        options: sessionOptions
    }

];