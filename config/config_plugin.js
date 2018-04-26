//const Pack = require('../package');
const swaggerOptions = {
    info: {
        title: 'CATB_Standard_Business_System API Documentation',
       // version: Pack.version
        version: '1.0'
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