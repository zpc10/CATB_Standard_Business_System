const org_handler = require("../handlers/org_handler");
const Joi = require('joi');
//返回数据模型
const dataModel = Joi.object({
    _id: Joi.string().example("5ae14b6c6072fd1c0e482ad2"),
    CODE: Joi.string().example("JH001"),
    NAME: Joi.string().example("北京XXX科技公司"),
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
        CODE: Joi.string().required().description('组织编号'),
        NAME: Joi.string().required().description('组织名称'),
        DESC: Joi.string().description('描述')
    }
).label('Create').description("填写相应的数据，添加组织");

//修改数据模型
const updateModel = Joi.object({
        NAME: Joi.string().required().description('组织名称'),
        DESC: Joi.string().description('描述')
    }
).label('Update').description("填写相应的数据，修改组织");

let get_org_all = {
    method: 'GET',
    path: '/org',
    config: {
        auth: false,
        description: '查询组织',
        notes: '直接获得系统的全部组织。',
        tags: ['api', 'org'],
        response: {schema: getListModel}
    },
    handler: org_handler.get_org_all
};

let get_org_by_id = {
    method: 'GET',
    path: '/org/{id}',
    config: {
        auth: false,
        description: '按ID查询组织',
        notes: '根据提供的ID获得相应的组织。',
        tags: ['api', 'org'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}

    },
    handler: org_handler.get_org_by_id
};


let create_org = {
    method: 'POST',
    path: '/org',
    config: {
        auth: false,
        description: '添加组织',
        notes: '根据提供的信息添加组织。',
        tags: ['api', 'org'],
        validate: {
            payload: createModel
        },
        response: {schema: getOneModel}
    },
    handler: org_handler.create_org
};

let update_org = {
    method: 'PUT',
    path: '/org/{id}',
    config: {
        auth: false,
        description: '更新组织',
        notes: '根据提供的信息更新组织。',
        tags: ['api', 'org'],
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: updateModel
        },
        response: {schema: getOneModel}
    },
    handler: org_handler.update_org
};

let delete_org = {
    method: 'DELETE',
    path: '/org/{id}',
    config: {
        auth: false,
        description: '删除组织',
        notes: '删除组织。',
        tags: ['api', 'org'],
        validate: {
            params: {
                id: Joi.string().required()
            }
        },
        response: {schema: getOneModel}
    },
    handler: org_handler.delete_org
};


module.exports = [
    get_org_all,
    get_org_by_id,
    create_org,
    update_org,
    delete_org

];