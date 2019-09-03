'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var DbSetting = exports.DbSetting = {
    host: 'localhost',
    database: 'demodb',
    user: 'root',
    password: 'root'
};

var ErrorCodeMessage = exports.ErrorCodeMessage = {
    Validation: 'Validation Error',
    Unaouthrized: 'Unaouthrized Access',
    Created: 'Created Successfully',
    NoData: 'Not available',
    Success: 'Success',
    Failure: 'Failure'
};

var InviteTokenRegex = exports.InviteTokenRegex = '^[a-zA-Z0-9]{6,12}$';

var UserRole = exports.UserRole = {
    admin: 'Admin',
    user: 'User'
};

var AdminData = exports.AdminData = {
    UserName: 'Admin',
    Password: 'Admin@123'
};