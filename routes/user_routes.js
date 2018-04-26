
const user_handler = require("../handlers/user_handler");

let get_user = {
    method: 'GET',
    path: '/user',
    config: {
        auth: false,
        description: 'Get SYS_USER',
        notes: 'Get SYS_USER',
        tags: ['api']
    },
    handler:user_handler.get_user
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