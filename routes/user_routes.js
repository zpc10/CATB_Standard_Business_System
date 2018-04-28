const user_handler = require("../handlers/user_handler");

let get_user_all = {
    method: 'GET',
    path: '/user',
    config: {
        auth: false,
        description: '查询全部用户',
        notes: '直接获得系统的全部用户获得全部用户。',
        tags: ['api']
    },
    handler: user_handler.get_user_all
};

let get_user_by_id = {
    method: 'GET',
    path: '/user/{id}',
    config: {
        auth: 'jwt',
        description: '按照用户ID查询用户',
        notes: '根据提供的ID获得相应的用户。',
        tags: ['api']
    },
    handler: user_handler.get_user_by_id
};


let create_user = {
    method: 'POST',
    path: '/user',
    config: {
        auth: false,
        description: '注册用户',
        notes: '根据提供的信息注册用户。',
        tags: ['api']
    },
    handler: user_handler.create_user
};

let update_user = {
    method: 'PUT',
    path: '/user/{id}',
    config: {
        auth: 'jwt',
        description: '更新用户',
        notes: '根据提供的信息更新用户。',
        tags: ['api']
    },
    handler: user_handler.update_user
};

let delete_user = {
    method: 'DELETE',
    path: '/user',
    config: {
        auth: 'jwt',
        description: '删除用户',
        notes: '删除用户。',
        tags: ['api']
    },
    handler: user_handler.delete_user
};

let login_user = {
    method: 'POST',
    path: '/login',
    config: {
        auth: false,
        description: '用户登录',
        notes: '根据用户的帐号和密码登录系统。',
        tags: ['api']
    },
    handler: user_handler.login_user
};


// let home = {
//     method: 'GET',
//     path: '/',
//     config: {
//         auth: 'false'
//     },
//     handler: (request, h) => {
//
//         return h.redirect('/login');
//
//     }
// };


module.exports = [
    get_user_all,
    get_user_by_id,
    login_user,
    create_user,
    update_user,
    delete_user

];