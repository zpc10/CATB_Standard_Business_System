const cash_handler = require("../handlers/cash_handler");
const Joi = require('joi');
//返回数据模型
const dataModel = Joi.object({
    _id: Joi.string().example("5ae14b6c6072fd1c0e482ad2"),
    VALUE: Joi.string().example("100"),
    OWNERID: Joi.string().example("5ae14b6c6072fd1c0e482ad2"),
    OWNERENTITY: Joi.string().example("user"),
    DESC: Joi.string().example("..."),
    CREATE_TIME: Joi.string().example("2018-04-28T03:17:59.322Z"),
    __v: Joi.number().example(0)

}).label('Data');

//返回错误问题模型
const wrongsModel = Joi.object({
    kye: Joi.string().example('system'),
    description: Joi.string().example('系统内部错误')
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
        VALUE: Joi.string().required().description('余额'),
        OWNERID: Joi.string().required().description('拥有者ID'),
        OWNERENTITY: Joi.string().required().description('拥有者类型'),
        DESC: Joi.string().description('描述')
    }
).label('Create').description("填写相应的数据，添加现金账户");

//修改数据模型
const updateModel = Joi.object({
        VALUE: Joi.string().required().description('余额'),
        OWNERID: Joi.string().required().description('拥有者ID'),
        OWNERENTITY: Joi.string().required().description('拥有者类型'),
        DESC: Joi.string().description('描述')
    }
).label('Update').description("填写相应的数据，修改现金账户");

let get_cash_all = {
    method: 'GET',
    path: '/cash',
    config: {
        auth: false,
        description: '查询现金账户',
        notes: '直接获得系统的全部现金账户。',
        tags: ['api', 'cash'],
        response: {schema: getListModel}
    },
    handler: cash_handler.get_cash_all
};

let get_cash_by_id = {
    method: 'GET',
    path: '/cash/{id}',
    config: {
        auth: false,
        description: '按ID查询现金账户',
        notes: '根据提供的ID获得相应的现金账户。',
        tags: ['api', 'cash'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}

    },
    handler: cash_handler.get_cash_by_id
};


let create_cash = {
    method: 'POST',
    path: '/cash',
    config: {
        auth: false,
        description: '添加现金账户',
        notes: '根据提供的信息添加现金账户。',
        tags: ['api', 'cash'],
        validate: {
            payload: createModel
        },
        response: {schema: getOneModel}
    },
    handler: cash_handler.create_cash
};

let update_cash = {
    method: 'PUT',
    path: '/cash/{id}',
    config: {
        auth: false,
        description: '更新现金账户',
        notes: '根据提供的信息更新现金账户。',
        tags: ['api', 'cash'],
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: updateModel
        },
        response: {schema: getOneModel}
    },
    handler: cash_handler.update_cash
};

let delete_cash = {
    method: 'DELETE',
    path: '/cash/{id}',
    config: {
        auth: false,
        description: '删除现金账户',
        notes: '删除现金账户。',
        tags: ['api', 'cash'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}
    },
    handler: cash_handler.delete_cash
};


module.exports = [
    get_cash_all,
    get_cash_by_id,
    create_cash,
    update_cash,
    delete_cash

];