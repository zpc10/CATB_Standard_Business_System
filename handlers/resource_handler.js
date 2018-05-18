const jwt_tool = require("../tools/jwt_tool");
const resource_service = require("../service/resource_service");

async function get_resource_all(request, h) {

    const result = await resource_service.get_resource_all();

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));


    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);

    return response;

}

async function get_resource_by_id(request, h) {
    let result = {};
    let id = request.params.id;

    result = await resource_service.get_resource_by_id(id);

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;
}

async function create_resource(request, h) {
    let resource = request.payload;

    const result = await resource_service.create_resource(resource);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


async function update_resource(request, h) {
    let result = {};
    let id = request.params.id;
    let resource = request.payload;

    result = await resource_service.update_resource(id, resource);

    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}

async function delete_resource(request, h) {
    let result = {};
    let id = request.params.id;

    result = await resource_service.delete_resource(id);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


module.exports = {
    get_resource_all: get_resource_all,
    get_resource_by_id: get_resource_by_id,
    create_resource: create_resource,
    update_resource: update_resource,
    delete_resource: delete_resource,
};