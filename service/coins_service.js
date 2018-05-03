let coins_model = require("../models/coins_model");
let Result = require("../models/result");

async function get_coins_by_id(id) {
    let result = {};

    try {

        let doc = await coins_model.findById(id);
        result = new Result(1, [], doc);

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "coins", description: '积分账户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function get_coins_all() {

    let result = {};

    try {
        let docs = await coins_model.find({});
        result = new Result(1, [], docs);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, []);
    }

    return result;

}

async function create_coins(coins) {

    let result = {};
    try {

        coins.CREATE_TIME = new Date();
        doc = await  coins_model.create(coins);
        result = new Result(1, [], doc);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

async function update_coins(id, coins) {

    let result = {};

    try {

        await coins_model.updateOne({_id: id}, {$set: coins});

        try {
            let doc = await coins_model.findById(id);
            result = new Result(1, [], doc);

        } catch (e) {
            let wrongs = [];
            let wrong = {kye: "system", description: '系统内部错误。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});
        }

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "coins", description: '积分账户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function delete_coins(id) {

    let result = {};

    try {
        await coins_model.remove({_id: id});
        result = new Result(1, [], {});
    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "coins", description: '积分账户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

module.exports = {

    create_coins: create_coins,
    get_coins_all: get_coins_all,
    get_coins_by_id: get_coins_by_id,
    update_coins: update_coins,
    delete_coins: delete_coins

};