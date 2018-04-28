const jwt = require('jsonwebtoken');
const config = require('../config/config');
const _privateKey = config.key.privateKey;
const _tokenExpiration = config.key.tokenExpiration;

module.exports.validate = async function (decoded, request) {


    if (typeof(request.session.views) != "undefined" && decoded.code == request.session.views) {

        return {isValid: true};

    } else {

        return {isValid: false};

    }


};


module.exports.getToken= async function (request) {

    const token = jwt.sign({
        code: request.session.views
    }, _privateKey, {
        expiresIn: _tokenExpiration //秒到期时间
    });

    return token


};



