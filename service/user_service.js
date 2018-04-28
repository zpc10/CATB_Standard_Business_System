let user_model = require("../models/user_model");
let Result = require("../models/result");
var Q = require('q');

async function get_user_by_id(id) {
    let result = {};
    let deferred = Q.defer();
    user_model.findById("5ae14b6c6072fd1c0e482ad2", function (err, doc) {
        if (!err) {


            deferred.resolve(doc);

        } else {

            deferred.reject(err);
        }
    });


    await deferred.promise.then((data) => {

        result = new Result(1, null, data);

    }, (error) => {

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

        result = new Result(1, null, data);

    }, (error) => {

    });

    return result;

}

async function create_user(user) {

    let result = {};
    let deferred = Q.defer();
    user_model.create(user, function (err, data) {
        if (!err) {

            deferred.resolve(data);

        } else {
            deferred.reject(err);
        }
    });

    await deferred.promise.then((data) => {


        result = new Result(1, null, data);

    }, (error) => {

    });

    return result;

}

async function update_user(id,user) {

    let result = {};
    let deferred = Q.defer();

    user_model.updateOne({_id:id},{$set:user}, function (err, data) {
        if (!err) {

            deferred.resolve(data);

        } else {
            deferred.reject(err);
        }
    });

    await deferred.promise.then((data) => {


        result = new Result(1, null, data);

    }, (error) => {

    });

    return result;

}

async function delete_user(id) {

    let result = {};
    let deferred = Q.defer();

    user_model.remove({_id:id}, function (err, data) {
        if (!err) {

            deferred.resolve(data);

        } else {
            deferred.reject(err);
        }
    });

    await deferred.promise.then((data) => {


        result = new Result(1, null, null);

    }, (error) => {

    });

    return result;

}



async function login_user(code,password) {

    let result = {};
    let deferred = Q.defer();
    user_model.findOne({CODE:code,PASSWORD:password}, function (err, doc) {
        if (!err) {

            deferred.resolve(doc);

        } else {

            deferred.reject(err);
        }
    });


    await deferred.promise.then((data) => {

        if((JSON.stringify(data) == "{}")){

            let wrongs = [{kye: "login", description: '帐号或者密码错误'}];

            result = new Result(0, wrongs, null);

        }else{

            result = new Result(1, null, data);
        }



    }, (error) => {

    });

    return result;

}

module.exports = {

    create_user: create_user,
    get_user_all: get_user_all,
    get_user_by_id: get_user_by_id,
    update_user:update_user,
    delete_user:delete_user,
    login_user:login_user

};