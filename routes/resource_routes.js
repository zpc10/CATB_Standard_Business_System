const resource_handler = require("../handlers/resource_handler");
const Joi = require('joi');
//返回数据模型
const dataModel = Joi.object({
    _id: Joi.string().example("5ae14b6c6072fd1c0e482ad2"),
    UNITS: Joi.string().example("个"),
    VALUE: Joi.string().example("1000"),
    CURL: Joi.string().example("hash地址"),
    RTYPE: Joi.string().example("MP4"),
    OWNERID: Joi.string().required().description('拥有者ID'),
    OWNERENTITY: Joi.string().required().description('拥有者类型'),
    DESC: Joi.string().description('描述'),
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
        UNITS: Joi.string().required().description("单位"),
        VALUE: Joi.string().required().description("数量"),
        CURL: Joi.string().required().description("hash地址"),
        RTYPE: Joi.string().required().description("类型"),
        OWNERID: Joi.string().required().description('拥有者ID'),
        OWNERENTITY: Joi.string().required().description('拥有者类型'),
        DESC: Joi.string().description('描述')
    }
).label('Create').description("填写相应的数据，添加资源");

//修改数据模型
const updateModel = Joi.object({
        UNITS: Joi.string().required().description("单位"),
        VALUE: Joi.string().required().description("数量"),
        CURL: Joi.string().required().description("hash地址"),
        RTYPE: Joi.string().required().description("类型"),
        OWNERID: Joi.string().required().description('拥有者ID'),
        OWNERENTITY: Joi.string().required().description('拥有者类型'),
        DESC: Joi.string().description('描述')
    }
).label('Update').description("填写相应的数据，修改资源");

let get_resource_all = {
    method: 'GET',
    path: '/resource',
    config: {
        auth: false,
        description: '查询资源',
        notes: '直接获得系统的全部资源。',
        tags: ['api', 'resource'],
        response: {schema: getListModel}
    },
    handler: resource_handler.get_resource_all
};

let get_resource_by_id = {
    method: 'GET',
    path: '/resource/{id}',
    config: {
        auth: false,
        description: '按ID查询资源',
        notes: '根据提供的ID获得相应的资源。',
        tags: ['api', 'resource'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}

    },
    handler: resource_handler.get_resource_by_id
};


let create_resource = {
    method: 'POST',
    path: '/resource',
    config: {
        auth: false,
        description: '添加资源',
        notes: '根据提供的信息添加资源。',
        tags: ['api', 'resource'],
        validate: {
            payload: createModel
        },
        response: {schema: getOneModel}
    },
    handler: resource_handler.create_resource
};

let update_resource = {
    method: 'PUT',
    path: '/resource/{id}',
    config: {
        auth: false,
        description: '更新资源',
        notes: '根据提供的信息更新资源。',
        tags: ['api', 'resource'],
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: updateModel
        },
        response: {schema: getOneModel}
    },
    handler: resource_handler.update_resource
};

let delete_resource = {
    method: 'DELETE',
    path: '/resource/{id}',
    config: {
        auth: false,
        description: '删除资源',
        notes: '删除资源。',
        tags: ['api', 'resource'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}
    },
    handler: resource_handler.delete_resource
};


module.exports = [
    get_resource_all,
    get_resource_by_id,
    create_resource,
    update_resource,
    delete_resource

];