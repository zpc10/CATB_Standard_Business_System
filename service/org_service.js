let org_model = require("../models/org_model");
let Result = require("../models/result");

async function get_org_by_id(id) {
    let result = {};

    try {

        let doc = await org_model.findById(id);
        result = new Result(1, [], doc);

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "org", description: '组织不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function get_org_all() {

    let result = {};

    try {
        let docs = await org_model.find({});
        result = new Result(1, [], docs);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, []);
    }

    return result;

}

async function create_org(org) {

    let result = {};
    try {

        org.CREATE_TIME = new Date();
        doc = await  org_model.create(org);
        result = new Result(1, [], doc);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

async function update_org(id, org) {

    let result = {};

    try {

        await org_model.updateOne({_id: id}, {$set: org});

        try {
            let doc = await org_model.findById(id);
            result = new Result(1, [], doc);

        } catch (e) {
            let wrongs = [];
            let wrong = {kye: "system", description: '系统内部错误。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});
        }

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "org", description: '组织不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function delete_org(id) {

    let result = {};

    try {
        await org_model.remove({_id: id});
        result = new Result(1, [], {});
    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "org", description: '组织不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

module.exports = {

    create_org: create_org,
    get_org_all: get_org_all,
    get_org_by_id: get_org_by_id,
    update_org: update_org,
    delete_org: delete_org

};