'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jasonwebtoken = require('../auth/jasonwebtoken');

var _adminRepository = require('../repository/adminRepository');

var _redis = require('../redis');

var _redis2 = _interopRequireDefault(_redis);

var _Constant = require('../models/Constant');

var _schemas = require('../schemas/schemas');

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ajv = require('ajv');

var ajv = new Ajv();

var routes = function routes(app) {
    // Authentication With Jwt Token
    app.post('/login', function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
            var validation, response, _jwttoken, jwttoken;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.t0 = req.body.UserRole;
                            _context.next = _context.t0 === _Constant.UserRole.user ? 3 : _context.t0 === _Constant.UserRole.admin ? 13 : 16;
                            break;

                        case 3:
                            validation = ajv.validate(_schemas.Userlogin, req.body);

                            if (!validation) {
                                _context.next = 11;
                                break;
                            }

                            _context.next = 7;
                            return (0, _adminRepository.checkInvitationToken)(req.body.InviteToken);

                        case 7:
                            response = _context.sent;

                            if (response) {
                                _jwttoken = generateUserToken(req.body);

                                res.status(200).send({ token: _jwttoken, message: _Constant.ErrorCodeMessage.Success });
                            } else {
                                res.status(401).send({ data: _Constant.ErrorCodeMessage.Unaouthrized, message: _Constant.ErrorCodeMessage.Failure });
                            }
                            _context.next = 12;
                            break;

                        case 11:
                            res.status(400).send({ data: _Constant.ErrorCodeMessage.Validation, message: _Constant.ErrorCodeMessage.Failure });

                        case 12:
                            return _context.abrupt('break', 17);

                        case 13:
                            jwttoken = generateUserToken(req.body);

                            res.status(200).send({ token: jwttoken, message: _Constant.ErrorCodeMessage.Success });

                            return _context.abrupt('break', 17);

                        case 16:
                            res.status(401).send({ data: _Constant.ErrorCodeMessage.Unaouthrized, message: _Constant.ErrorCodeMessage.Failure });

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());

    // Call User Toke
    var generateUserToken = function generateUserToken(data) {
        var jwtToken = (0, _jasonwebtoken.generateToken)(data);
        _redis2.default.set('UserData', jwtToken);
        return jwtToken;
    };

    // Generate and Store User Invitation Token
    app.post('/inviteToken', checkToken, function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
            var validation;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            validation = ajv.validate(_schemas.inviteToken, req.body);

                            if (validation) {
                                _redis2.default.get('UserData', function () {
                                    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(error, token) {
                                        var response, userData, data;
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        _context2.next = 2;
                                                        return (0, _jasonwebtoken.verifyToken)(token);

                                                    case 2:
                                                        response = _context2.sent;

                                                        if (!response.isError) {
                                                            _context2.next = 7;
                                                            break;
                                                        }

                                                        res.status(401);
                                                        _context2.next = 16;
                                                        break;

                                                    case 7:
                                                        userData = (0, _jasonwebtoken.decodeToken)(token);

                                                        if (!(userData.UserRole === _Constant.UserRole.admin)) {
                                                            _context2.next = 15;
                                                            break;
                                                        }

                                                        _context2.next = 11;
                                                        return (0, _adminRepository.setInvitationTokenDetails)(req.body);

                                                    case 11:
                                                        data = _context2.sent;

                                                        res.status(201).send({ inviteToken: data, message: true });
                                                        _context2.next = 16;
                                                        break;

                                                    case 15:
                                                        res.status(401).send({ message: 'You dont have Access' });

                                                    case 16:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, undefined);
                                    }));

                                    return function (_x5, _x6) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());
                            } else {
                                res.status(400).send({ message: 'Validation Error' });
                            }

                        case 2:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }());

    // List of all token for admin
    app.get('/getAllInviteToken', checkToken, function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _redis2.default.get('UserData', function () {
                                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(error, token) {
                                    var response, userData, data;
                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    _context4.next = 2;
                                                    return (0, _jasonwebtoken.verifyToken)(token);

                                                case 2:
                                                    response = _context4.sent;

                                                    if (!response.isError) {
                                                        _context4.next = 7;
                                                        break;
                                                    }

                                                    res.status(401).send({ data: _Constant.ErrorCodeMessage.Unaouthrized, message: _Constant.ErrorCodeMessage.Failure });
                                                    _context4.next = 16;
                                                    break;

                                                case 7:
                                                    userData = (0, _jasonwebtoken.decodeToken)(token);

                                                    if (!(userData.UserRole === _Constant.UserRole.admin)) {
                                                        _context4.next = 15;
                                                        break;
                                                    }

                                                    _context4.next = 11;
                                                    return (0, _adminRepository.getAllInviteToken)();

                                                case 11:
                                                    data = _context4.sent;

                                                    res.status(200).send(data);
                                                    _context4.next = 16;
                                                    break;

                                                case 15:
                                                    res.status(401).send({ data: _Constant.ErrorCodeMessage.Unaouthrized, message: _Constant.ErrorCodeMessage.Failure });

                                                case 16:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, undefined);
                                }));

                                return function (_x9, _x10) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function (_x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    }());

    // verify Token
    function checkToken(req, res, next) {
        var authorization = req.get('Authorization');
        if (authorization !== 'undefined') {
            var bearerToken = authorization.split(' ')[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(401).send({ data: _Constant.ErrorCodeMessage.Unaouthrized, message: _Constant.ErrorCodeMessage.Failure });
        }
    }
};
exports.default = routes;