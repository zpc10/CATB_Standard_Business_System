const jwt_tool = require("../tools/jwt_tool");
const user_service = require("../service/user_service");

async function get_user_all(request, h) {

    const result = await user_service.get_user_all();

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));

    response.header("token", token);

    return response;

}

async function get_user_by_id(request, h) {
    let result = {};
    let id = request.params.id;

    result = await user_service.get_user_by_id(id);

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("token", token);
    return response;
}

async function create_user(request, h) {
    let user = request.payload;

    const result = await user_service.create_user(user);

    const response = h.response(JSON.stringify(result));

    return response;

}


async function update_user(request, h) {
    let result = {};
    let id = request.params.id;
    let user = request.payload;

    result = await user_service.update_user(id, user);

    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("token", token);
    return response;

}

async function delete_user(request, h) {
    let result = {};
    let id = request.params.id;

    result = await user_service.delete_user(id);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("token", token);
    return response;

}


async function login_user(request, h) {
    let result = {};
    const CODE = request.payload.CODE;
    const PASSWORD = request.payload.PASSWORD;
    result = await user_service.login_user(CODE, PASSWORD);

    const response = h.response(JSON.stringify(result));

    if (result.status == 1) {

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