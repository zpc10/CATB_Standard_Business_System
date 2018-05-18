const jwt_tool = require("../tools/jwt_tool");
const coins_service = require("../service/coins_service");

async function get_coins_all(request, h) {

    const result = await coins_service.get_coins_all();

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);

    return response;

}

async function get_coins_by_id(request, h) {
    let result = {};
    let id = request.params.id;

    result = await coins_service.get_coins_by_id(id);

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;
}

async function create_coins(request, h) {
    let coins = request.payload;

    const result = await coins_service.create_coins(coins);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


async function update_coins(request, h) {
    let result = {};
    let id = request.params.id;
    let coins = request.payload;

    result = await coins_service.update_coins(id, coins);

    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}

async function delete_coins(request, h) {
    let result = {};
    let id = request.params.id;

    result = await coins_service.delete_coins(id);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


module.exports = {
    get_coins_all: get_coins_all,
    get_coins_by_id: get_coins_by_id,
    create_coins: create_coins,
    update_coins: update_coins,
    delete_coins: delete_coins,
};