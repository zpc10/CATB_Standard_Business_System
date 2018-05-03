let user_model = require("../models/user_model");
let Result = require("../models/result");

async function get_user_by_id(id) {
    let result = {};

    try {

        let doc = await user_model.findById(id);
        result = new Result(1, [], doc);

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "user", description: '用户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function get_user_all() {

    let result = {};

    try {
        let docs = await user_model.find({});
        result = new Result(1, [], docs);

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, []);
    }

    return result;

}

async function create_user(user) {

    let result = {};
    try {
        let doc = await user_model.findOne({CODE: user.CODE});
        if (doc == null) {

            try {
                user.CREATE_TIME = new Date();
                doc = await  user_model.create(user);
                result = new Result(1, [], doc);
            } catch (e) {
                let wrongs = [];
                let wrong = {kye: "system", description: '系统内部错误。'};
                wrongs.push(wrong);
                result = new Result(0, wrongs, {});
            }

        } else {
            let wrongs = [];
            let wrong = {kye: "user", description: '账户已存在。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});
        }
    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}

async function update_user(id, user) {

    let result = {};

    try {

        await user_model.updateOne({_id: id}, {$set: user});

        try {
            let doc = await user_model.findById(id);
            result = new Result(1, [], doc);

        } catch (e) {
            let wrongs = [];
            let wrong = {kye: "system", description: '系统内部错误。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});
        }

    } catch (e) {

        let wrongs = [];
        let wrong = {kye: "user", description: '用户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    }

    return result;

}

async function delete_user(id) {

    let result = {};

    try {
        await user_model.remove({_id: id});
        result = new Result(1, [], {});
    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "user", description: '用户不存在。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }

    return result;

}


async function login_user(code, password) {

    let result = {};

    try {

        let doc = user_model.findOne({CODE: code, PASSWORD: password});
        if (doc == null) {

            let wrongs = [{kye: "login", description: '帐号或者密码错误'}];
            result = new Result(0, wrongs, {});

        } else {

            result = new Result(1, [], doc);
        }

    } catch (e) {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});
    }
    return result;

}

module.exports = {

    create_user: create_user,
    get_user_all: get_user_all,
    get_user_by_id: get_user_by_id,
    update_user: update_user,
    delete_user: delete_user,
    login_user: login_user

};