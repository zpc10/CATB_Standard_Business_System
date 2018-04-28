const jwt_tool = require("../tools/jwt_tool");
const user_service = require("../service/user_service");

async function get_user_all(request, h) {

    const result = await user_service.get_user_all();

    const token = await jwt_tool.getToken(request);

    const response = h.response(result);
    response.header("token", token);

    return response;

}

async function get_user_by_id(request, h) {
    let result = {};
    let id = request.params.id;

    if (!id) {

        let wrongs = [{kye: "id", description: 'id不存在，请填写id'}];

        result = new Result(0, wrongs, null);


    } else {

        result = await user_service.get_user_by_id(id);

    }

    const token = await jwt_tool.getToken(request);

    const response = h.response(result);
    response.header("token", token);
    return response;
}

async function create_user(request, h) {

    // let user=request.payload;

    let user = {
        CODE: "wohao",
        NAME: "wohao",
        FIRSTNAME: "wohao",
        LASTNAME: "wohao",
        PASSWORD: "wohao",
        EMAIL: "wohao",
        PHONE: "wohao",
        STATUS: "disable",
        CREATE_TIME: new Date()
    };

    const result = await user_service.create_user(user);

    const token = await jwt_tool.getToken(request);
    const response = h.response(result);
    response.header("token", token);
    return response;

}


async function update_user(request, h) {
    let result = {};
    let id = request.params.id;

    if (!id) {

        let wrongs = [{kye: "id", description: 'id不存在，请填写id'}];

        result = new Result(0, wrongs, null);

    } else {

        // let user=request.payload;
        let user = {
            NAME: "wohao",
            FIRSTNAME: "wohao",
            LASTNAME: "wohao",
            PASSWORD: "wohao",
            EMAIL: "wohao",
            PHONE: "wohao",
            STATUS: "disable"
        };

        result = await user_service.update_user(id, user);

    }

    const token = await jwt_tool.getToken(request);
    const response = h.response(result);
    response.header("token", token);
    return response;

}

async function delete_user(request, h) {
    let result = {};
    let id = request.params.id;

    if (!id) {

        let wrongs = [{kye: "id", description: 'id不存在，请填写id'}];

        result = new Result(0, wrongs, null);

    } else {

        result = await user_service.delete_user(id);

    }

    const token = await jwt_tool.getToken(request);
    const response = h.response(result);
    response.header("token", token);
    return response;

}


async function login_user(request, h) {
    let result = {};
    // const code=request.payload.code;
    // const PASSWORD=request.payload.code;

    const code = "wohao";
    const PASSWORD = "wohao";

    result = await user_service.login_user(code, PASSWORD);

    const response = h.response(result);

    if (result.status == 1) {

        request.session.views = code;

        const token = await jwt_tool.getToken(request);

        response.header("token", token);
    }

    return response;

}


module.exports = {
    get_user_all: get_user_all,
    get_user_by_id: get_user_by_id,
    create_user: create_user,
    update_user: update_user,
    delete_user: delete_user,
    login_user: login_user
};