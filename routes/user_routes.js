const user_handler = require("../handlers/user_handler");
const Joi = require('joi');
//返回数据模型
const dataModel = Joi.object({
    STATUS: Joi.string().example('disable'),
    _id: Joi.string().example("5ae14b6c6072fd1c0e482ad2"),
    CODE: Joi.string().example("oldsix"),
    NAME: Joi.string().example("老六"),
    FIRSTNAME: Joi.string().example("老"),
    LASTNAME: Joi.string().example("六"),
    PASSWORD: Joi.string().example("oldsix_1984"),
    EMAIL: Joi.string().example("oldsix@126.com"),
    PHONE: Joi.string().example("13588888888"),
    CREATE_TIME: Joi.string().example("2018-04-28T03:17:59.322Z"),
    __v: Joi.number().example(0)

}).label('Data');

//返回错误问题模型
const wrongsModel = Joi.object({
    kye:Joi.string().example('system'),
    description:Joi.string().example('系统内部错误')
}).label('Wrongs');

//返回多个数据模型
const getListModel = Joi.object({
    status: Joi.number().required().example(1),
    wrongs: Joi.array().items(wrongsModel),
    data: Joi.array().items(dataModel)

}).label('GetList').description("status：1证明操作成功，使用data里面的数据信息。status：0证明操作失败，使用wrongs里面的错误提示。");

//返回单个数据模型
const getOneModel = Joi.object({
    status: Joi.number().required().example(1),
    wrongs: Joi.array().items(wrongsModel),
    data: dataModel

}).label('GetOne').description("status：1证明操作成功，使用data里面的数据信息。status：0证明操作失败，使用wrongs里面的错误提示。");

//添加数据模型
const createModel = Joi.object({
        CODE: Joi.string().required().description('帐号'),
        NAME: Joi.string().required().description('全名'),
        FIRSTNAME: Joi.string().required().description('姓'),
        LASTNAME: Joi.string().required().description('名'),
        PASSWORD: Joi.string().required().description('密码'),
        EMAIL: Joi.string().email().required().description('邮箱'),
        PHONE: Joi.string().required().description('电话')
    }
).label('Create').description("填写相应的数据，添加用户信息");

//修改数据模型
const updateModel = Joi.object({
        NAME: Joi.string().required().description('全名'),
        FIRSTNAME: Joi.string().required().description('姓'),
        LASTNAME: Joi.string().required().description('名'),
        PASSWORD: Joi.string().required().description('密码'),
        EMAIL: Joi.string().email().required().description('邮箱'),
        PHONE: Joi.string().required().description('电话')
    }
).label('Update').description("填写相应的数据，修改用户信息");

let get_user_all = {
    method: 'GET',
    path: '/user',
    config: {
        auth: false,
        description: '查询用户',
        notes: '直接获得系统的全部用户获得全部用户。',
        tags: ['api','user'],
        response: {schema: getListModel}
    },
    handler: user_handler.get_user_all
};

let get_user_by_id = {
    method: 'GET',
    path: '/user/{id}',
    config: {
        auth: false,
        description: '按ID查询用户',
        notes: '根据提供的ID获得相应的用户。',
        tags: ['api','user'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}

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
        tags: ['api','user'],
        validate: {
            payload: createModel
        },
        response: {schema: getOneModel}
    },
    handler: user_handler.create_user
};

let update_user = {
    method: 'PUT',
    path: '/user/{id}',
    config: {
        auth: false,
        description: '更新用户',
        notes: '根据提供的信息更新用户。',
        tags: ['api','user'],
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload:updateModel
        },
        response: {schema: getOneModel}
    },
    handler: user_handler.update_user
};

let delete_user = {
    method: 'DELETE',
    path: '/user/{id}',
    config: {
        auth: false,
        description: '删除用户',
        notes: '删除用户。',
        tags: ['api','user'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}
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
        tags: ['api','user'],
        validate: {
            payload: {
                CODE: Joi.string().required(),
                PASSWORD: Joi.string().required()
            }
        },
        response: {schema: getOneModel}
    },
    handler: user_handler.login_user
};

module.exports = [
    get_user_all,
    get_user_by_id,
    login_user,
    create_user,
    update_user,
    delete_user

];