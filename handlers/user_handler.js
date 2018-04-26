const jwt = require('jsonwebtoken');
const config = require('../config/config');
const _privateKey = config.key.privateKey;
const _tokenExpiration = config.key.tokenExpiration;
const user_service = require("../service/user_service");

async function get_user(request, h) {
    let values;
    /*  let id = request.params.id;
      if (!id) {
         values=sys_user_controllers.getByID(id);
      } else {*/


    values = await user_service.get_user_all();

    const token = jwt.sign({
        name: 123
    }, _privateKey, {
        expiresIn: _tokenExpiration //秒到期时间
    });

    const response = h.response(values);
    response.header("token", token);


    return response;

}


module.exports = {
    get_user: get_user
};