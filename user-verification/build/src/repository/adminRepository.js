'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllInviteToken = exports.checkInvitationToken = exports.setInvitationTokenDetails = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _Constant = require('../models/Constant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GetAllInviteToken = 'usp_get_all_invite_token';
var SetInviteTokenDetail = 'usp_set_invite_token_detail';
var CheckInviteTokenDetail = 'usp_check_invite_token';
var RandExp = require('randexp').randexp;

// store token in databser
var setInvitationTokenDetails = exports.setInvitationTokenDetails = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var inviteTokenValue, params;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        inviteTokenValue = RandExp(_Constant.InviteTokenRegex);
                        params = [inviteTokenValue, data.UserName, data.EmailId, data.UserRole];
                        _context.next = 4;
                        return _database2.default.Execute(SetInviteTokenDetail, params);

                    case 4:
                        return _context.abrupt('return', inviteTokenValue);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function setInvitationTokenDetails(_x) {
        return _ref.apply(this, arguments);
    };
}();
// check token exits and in not expired
var checkInvitationToken = exports.checkInvitationToken = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(inviteTokenValue) {
        var params, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        params = [inviteTokenValue];
                        _context2.next = 3;
                        return _database2.default.Execute(CheckInviteTokenDetail, params);

                    case 3:
                        result = _context2.sent;
                        return _context2.abrupt('return', result[0].Result);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function checkInvitationToken(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

// list of All Records As Admin
var getAllInviteToken = exports.getAllInviteToken = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _database2.default.Execute(GetAllInviteToken);

                    case 2:
                        result = _context3.sent;
                        return _context3.abrupt('return', result);

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getAllInviteToken() {
        return _ref3.apply(this, arguments);
    };
}();