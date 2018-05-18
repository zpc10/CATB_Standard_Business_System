const jwt_tool = require("../tools/jwt_tool");
const cash_service = require("../service/cash_service");

async function get_cash_all(request, h) {

    const result = await cash_service.get_cash_all();

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);

    return response;

}

async function get_cash_by_id(request, h) {
    let result = {};
    let id = request.params.id;

    result = await cash_service.get_cash_by_id(id);

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;
}

async function create_cash(request, h) {
    let cash = request.payload;

    const result = await cash_service.create_cash(cash);
    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));

    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


async function update_cash(request, h) {
    let result = {};
    let id = request.params.id;
    let cash = request.payload;

    result = await cash_service.update_cash(id, cash);

    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}

async function delete_cash(request, h) {
    let result = {};
    let id = request.params.id;

    result = await cash_service.delete_cash(id);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


module.exports = {
    get_cash_all: get_cash_all,
    get_cash_by_id: get_cash_by_id,
    create_cash: create_cash,
    update_cash: update_cash,
    delete_cash: delete_cash,
};