const jwt = require('jsonwebtoken');
const jwtSecret = 'secretkey';

// generate jwt token
export function generateToken(data) {
    return jwt.sign(data, jwtSecret, { expiresIn: 900000 });
}

// verify whether provided token is formatted correct jwt
export function verifyToken(token) {
    try {
        const ret = {
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
export function decodeToken(token) {
    return jwt.decode(token);
}