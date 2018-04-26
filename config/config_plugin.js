const Pack = require('../package');
const swaggerOptions = {
    info: {
        title: 'CATB_Standard_Business_System API Documentation',
        version: Pack.version
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
    }
];