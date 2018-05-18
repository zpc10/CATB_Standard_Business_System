const jwt_tool = require("../tools/jwt_tool");
const org_service = require("../service/org_service");

async function get_org_all(request, h) {

    const result = await org_service.get_org_all();

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);

    return response;

}

async function get_org_by_id(request, h) {
    let result = {};
    let id = request.params.id;

    result = await org_service.get_org_by_id(id);

    const token = await jwt_tool.getToken(request);

    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;
}

async function create_org(request, h) {
    let org = request.payload;

    const result = await org_service.create_org(org);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


async function update_org(request, h) {
    let result = {};
    let id = request.params.id;
    let org = request.payload;

    result = await org_service.update_org(id, org);

    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}

async function delete_org(request, h) {
    let result = {};
    let id = request.params.id;

    result = await org_service.delete_org(id);
    const token = await jwt_tool.getToken(request);
    const response = h.response(JSON.stringify(result));
    response.header("content-type", "application/json; charset=utf-8");
    response.header("token", token);
    return response;

}


module.exports = {
    get_org_all: get_org_all,
    get_org_by_id: get_org_by_id,
    create_org: create_org,
    update_org: update_org,
    delete_org: delete_org,
};