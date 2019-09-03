'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.decodeToken = decodeToken;
var jwt = require('jsonwebtoken');
var jwtSecret = 'secretkey';

// generate jwt token
function generateToken(data) {
    return jwt.sign(data, jwtSecret, { expiresIn: 900000 });
}

// verify whether provided token is formatted correct jwt
function verifyToken(token) {
    try {
        var ret = {
            isError: false,
            payload: jwt.verify(token, jwtSecret)
        };
        return ret;
    } catch (error) {
        return {
            isError: true,
            errMsg: error.message
        };
    }
}
// decode encrypted token for verification
function decodeToken(token) {
    return jwt.decode(token);
}