const jwt = require('jsonwebtoken');
const config = require('../config/config');
const _privateKey = config.key.privateKey;
const _tokenExpiration = config.key.tokenExpiration;
const user_service = require("../service/user_service");

let get_user = {
    method: 'GET',
    path: '/user',
    config: {
        auth: false,
        description: 'Get SYS_USER',
        notes: 'Get SYS_USER',
        tags: ['api']
    },
    handler: async function (request, h) {
        let values;
        /*  let id = request.params.id;
          if (!id) {
             values=sys_user_controllers.getByID(id);
          } else {*/
        let response = h.response();
      await user_service.getAll().then((data) => {

            const token = jwt.sign({
                name: 123
            }, _privateKey, {
                expiresIn: _tokenExpiration //秒到期时间
            });

            response = h.response(data);
            response.header("token", token);

        }, (error) => {
            response=null;
        });

        return response;

    }
};
let create_user = {
    method: 'POST', path: '/sys_user', config: {auth: 'jwt'},
    handler: function (request, h) {
        const response = h.response({text: 'You used a Token!'});
        response.header("Authorization", request.headers.authorization);
        return response;
    }
};

let update_user = {
    method: 'PUT', path: '/sys_user', config: {auth: 'jwt'},
    handler: function (request, h) {
        const response = h.response({text: 'You used a Token!'});
        response.header("Authorization", request.headers.authorization);
        return response;
    }
};

let delete_user = {
    method: 'DELETE', path: '/sys_user', config: {auth: 'jwt'},
    handler: function (request, h) {
        const response = h.response({text: 'You used a Token!'});
        response.header("Authorization", request.headers.authorization);
        return response;
    }
};

module.exports = [get_user, create_user, update_user, delete_user];