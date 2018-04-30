const jwt = require('jsonwebtoken');
const config = require('../config/config');
const _privateKey = config.key.privateKey;
const _tokenExpiration = config.key.tokenExpiration;

module.exports.validate = async function (decoded, request) {


    if (decoded.name=="shanpeng238") {

        return {isValid: true};

    } else {

        return {isValid: false};

    }


};


module.exports.getToken= async function (request) {

    let tokenData = {
        name: "shanpeng238",
        scope: "1"
    };

    const token = jwt.sign({
        code: tokenData
    }, _privateKey, {
        expiresIn: _tokenExpiration //秒到期时间
    });

    return token


};



