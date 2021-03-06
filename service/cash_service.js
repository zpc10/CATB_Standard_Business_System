let cash_model = require("../models/cash_model");
let Result = require("../models/result");

async function get_cash_by_id(id) {
    let result = {};

    try {

        let doc = await cash_model.findById(id);
        result = new Result(1, [], doc);

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "cash", description: '现金账户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function get_cash_all() {

    let result = {};

    try {
        let docs = await cash_model.find({});
        result = new Result(1, [], docs);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, []);
    }

    return result;

}

async function create_cash(cash) {

    let result = {};
    try {

        cash.CREATE_TIME = new Date();
        doc = await  cash_model.create(cash);
        result = new Result(1, [], doc);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

async function update_cash(id, cash) {

    let result = {};

    try {

        await cash_model.updateOne({_id: id}, {$set: cash});

        try {
            let doc = await cash_model.findById(id);
            result = new Result(1, [], doc);

        } catch (e) {
            let wrongs = [];
            let wrong = {kye: "system", description: '系统内部错误。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});
        }

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "cash", description: '现金账户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function delete_cash(id) {

    let result = {};

    try {
        await cash_model.remove({_id: id});
        result = new Result(1, [], {});
    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "cash", description: '现金账户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

module.exports = {

    create_cash: create_cash,
    get_cash_all: get_cash_all,
    get_cash_by_id: get_cash_by_id,
    update_cash: update_cash,
    delete_cash: delete_cash

};