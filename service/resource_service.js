let resource_model = require("../models/resource_model");
let Result = require("../models/result");

async function get_resource_by_id(id) {
    let result = {};

    try {

        let doc = await resource_model.findById(id);
        result = new Result(1, [], doc);

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "resource", description: '资源不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function get_resource_all() {

    let result = {};

    try {
        let docs = await resource_model.find({});
        result = new Result(1, [], docs);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, []);
    }

    return result;

}

async function create_resource(resource) {

    let result = {};
    try {

        resource.CREATE_TIME = new Date();
        doc = await  resource_model.create(resource);
        result = new Result(1, [], doc);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

async function update_resource(id, resource) {

    let result = {};

    try {

        await resource_model.updateOne({_id: id}, {$set: resource});

        try {
            let doc = await resource_model.findById(id);
            result = new Result(1, [], doc);

        } catch (e) {
            let wrongs = [];
            let wrong = {kye: "system", description: '系统内部错误。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});
        }

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "resource", description: '资源不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function delete_resource(id) {

    let result = {};

    try {
        await resource_model.remove({_id: id});
        result = new Result(1, [], {});
    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "resource", description: '资源不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

module.exports = {

    create_resource: create_resource,
    get_resource_all: get_resource_all,
    get_resource_by_id: get_resource_by_id,
    update_resource: update_resource,
    delete_resource: delete_resource

};