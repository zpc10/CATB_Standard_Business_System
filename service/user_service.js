let user_model = require("../models/user_model");

function create_user(user) {
    user_model.create(user, function (err) {
        if (!err) {
            console.log("插入成功~~~");
        }
    });
}

function get_user_by_id(_id) {
    user_model.findOne({_id: _id}, function (err, doc) {
        if (!err) {

            return doc;

        } else {

            return null;
        }
    });
}


function get_user_all() {

    return new Promise((resolve, reject) => {
        //初始化promise的状态为pending---->初始化状态
        //启动异步任务
        user_model.find({}, function (err, doc) {
            if (!err) {

                resolve(doc);


            } else {
                reject(err);

            }
        });

    });

}


module.exports = {

    create_user: create_user,
    get_user_all: get_user_all,
    get_user_by_id: get_user_by_id

};