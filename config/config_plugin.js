const Pack = require('../package');
const swaggerOptions = {
    info: {
        title: 'CATB_Standard_Business_System API Documentation',
        version: Pack.version,
    },
    tags: [{
        'name': 'user',
        'description': '用户信息的基本操作，包括：增加，删除，修改和查询等。'
    }, {
        'name': 'login',
        'description': '用户登录操作。'

    }
    ]
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