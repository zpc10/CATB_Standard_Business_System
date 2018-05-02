var Q = require('q');
let cash_model = require("../models/cash_model");
let Result = require("../models/result");


async function get_cash_by_id(id) {
    let result = {};
    let deferred = Q.defer();
    cash_model.findById(id, function (err, doc) {

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
        let wrong = {kye: "system", description: '现金不存在。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, {});

    });

    return result;

}


async function get_cash_all() {

    let result = {};
    let deferred = Q.defer();
    cash_model.find({}, function (err, doc) {
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

async function create_cash(cash) {

    let result = {};
    let deferred = Q.defer();
    let cashExist = true;

    cash_model.findOne({CODE: cash.CODE}, function (err, doc) {
        if (!err) {
            deferred.resolve(doc);
        } else {
            deferred.reject(err);
        }
    });


    await deferred.promise.then((data) => {

        if (data == null) {

            cashExist = false;

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

    if (!cashExist) {

        deferred = Q.defer();

        cash.CREATE_TIME = new Date();
        cash_model.create(cash, function (err, data) {
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

async function update_cash(id, cash) {

    let result = {};
    let deferred = Q.defer();
    let updateok = false;

    cash_model.updateOne({_id: id}, {$set: cash}, function (err, data) {
        if (!err) {

            deferred.resolve(data);

        } else {
            deferred.reject(err);
        }
    });

    await deferred.promise.then((data) => {

        updateok = true;

    }, (error) => {
        let wrongs = [];
        let wrong = {kye: "cash", description: '现金不存在。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, {});
    });


    if (updateok) {
        deferred = Q.defer();

        cash_model.findById(id, function (err, doc) {

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

            result = new Result(0, wrongs, {});

        });

    }

    return result;

}

async function delete_cash(id) {

    let result = {};
    let deferred = Q.defer();

    cash_model.remove({_id: id}, function (err, data) {
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
        let wrong = {kye: "cash", description: '现金不存在。'};

        wrongs.push(wrong);

        result = new Result(0, wrongs, {});
    });

    return result;

}

module.exports = {

    create_cash: create_cash,
    get_cash_all: get_cash_all,
    get_cash_by_id: get_cash_by_id,
    update_cash: update_cash,
    delete_cash: delete_cash

};