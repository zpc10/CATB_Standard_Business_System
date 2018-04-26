const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('../config/config');
const _privateKey = config.key.privateKey;
const _tokenExpiration = config.key.tokenExpiration;

let index = {
    method: 'GET',
    path: '/',
    config: {
        auth: false,
        description: 'Get todo',
        notes: 'Returns a todo item by the id passed in the path',
        tags: ['api']
    },
    handler: function (request, h) {

        //jwt生成token
        const token = jwt.sign({
            name: 123
        }, _privateKey, {
            expiresIn: _tokenExpiration //秒到期时间
        });
        console.log(token);
        const response = h.response({text: token});
        response.header("token",token);

        return response;

    }
};
let hello = {
    method: 'GET', path: '/restricted', config: {auth: 'jwt'},
    handler: function (request, h) {
        const response = h.response({text: 'You used a Token!'});


        response.header("Authorization", request.headers.authorization);
        return response;
    }
};
module.exports = [index, hello];