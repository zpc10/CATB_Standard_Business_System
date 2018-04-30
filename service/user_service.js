var Q = require('q');
let user_model = require("../models/user_model");
let Result = require("../models/result");


async function get_user_by_id(id) {
    let result = {};
    let deferred = Q.defer();
    user_model.findById(id, function (err, doc) {

        if (!err) {

            deferred.resolve(doc);

        } else {

            deferred.reject(err);
        }
    });


    await deferred.promise.then((data) => {

        result = new Result(1, [], data);

    }, (error) => {

        let wrongs = [];
        let wrong = {kye: "system", description: '用户不存在。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, {});

    });

    return result;

}


async function get_user_all() {

    let result = {};
    let deferred = Q.defer();
    user_model.find({}, function (err, doc) {
        if (!err) {

            deferred.resolve(doc);

        } else {

            deferred.reject(err);
        }
    });


    await deferred.promise.then((data) => {

        result = new Result(1, [], data);

    }, (error) => {

        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, []);

    });

    return result;

}

async function create_user(user) {

    let result = {};
    let deferred = Q.defer();
    let userExist = true;

    user_model.findOne({CODE: user.CODE}, function (err, doc) {
        if (!err) {
            deferred.resolve(doc);
        } else {
            deferred.reject(err);
        }
    });


    await deferred.promise.then((data) => {

        if (data == null) {

            userExist = false;

        } else {
            let wrongs = [];
            let wrong = {kye: "CODE", description: '账户已存在。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});
        }
    }, (error) => {

        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};
        wrongs.push(wrong);
        result = new Result(0, wrongs, {});

    });

    if (!userExist) {

        deferred = Q.defer();

        user.CREATE_TIME = new Date();
        user_model.create(user, function (err, data) {
            if (!err) {

                deferred.resolve(data);

            } else {

                deferred.reject(err);
            }
        });

        await deferred.promise.then((data) => {

            result = new Result(1, [], data);

        }, (error) => {

            let wrongs = [];
            let wrong = {kye: "system", description: '系统内部错误。'};
            wrongs.push(wrong);
            result = new Result(0, wrongs, {});

        });


    }

    return result;

}

async function update_user(id, user) {

    let result = {};
    let deferred = Q.defer();
    let updateok = false;

    user_model.updateOne({_id: id}, {$set: user}, function (err, data) {
        if (!err) {

            deferred.resolve(data);

        } else {
            deferred.reject(err);
        }
    });

    await deferred.promise.then((data) => {

        //result = new Result(1, [], data);

        updateok = true;

    }, (error) => {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, {});
    });


    if (updateok) {
        deferred = Q.defer();

        user_model.findById(id, function (err, doc) {

            if (!err) {

                deferred.resolve(doc);

            } else {

                deferred.reject(err);
            }
        });


        await deferred.promise.then((data) => {

            result = new Result(1, [], data);

        }, (error) => {

            let wrongs = [];
            let wrong = {kye: "system", description: '用户不存在。'};

            wrongs.push(wrong);

            result = new Result(0, wrongs, {});

        });

    }

    return result;

}

async function delete_user(id) {

    let result = {};
    let deferred = Q.defer();

    user_model.remove({_id: id}, function (err, data) {
        if (!err) {

            deferred.resolve(data);

        } else {
            deferred.reject(err);
        }
    });

    await deferred.promise.then((data) => {


        result = new Result(1, [], {});

    }, (error) => {
        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, {});
    });

    return result;

}


async function login_user(code, password) {

    let result = {};
    let deferred = Q.defer();
    user_model.findOne({CODE: code, PASSWORD: password}, function (err, doc) {
        if (!err) {

            deferred.resolve(doc);

        } else {

            deferred.reject(err);
        }
    });


    await deferred.promise.then((data) => {

        if (data==null) {

            let wrongs = [{kye: "login", description: '帐号或者密码错误'}];

            result = new Result(0, wrongs, {});

        } else {

            result = new Result(1, [], data);
        }


    }, (error) => {

        let wrongs = [];
        let wrong = {kye: "system", description: '系统内部错误。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, {});

    });

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