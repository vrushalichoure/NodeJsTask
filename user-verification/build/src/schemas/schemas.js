'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Adminlogin = exports.Adminlogin = {
    properties: {
        InviteToken: {
            type: 'string',
            range: [6 - 12]
        },
        UserName: {
            type: 'string'
        },
        EmailId: {
            type: 'string'
        },
        UserRole: {
            type: 'string'
        }
    },
    required: ['UserName', 'EmailId', 'UserRole']

};

var Userlogin = exports.Userlogin = {
    properties: {
        InviteToken: {
            type: 'string'
        },
        UserName: {
            type: 'string'
        },
        EmailId: {
            type: 'string'
        },
        UserRole: {
            type: 'string'
        }
    },
    required: ['InviteToken', 'UserName', 'EmailId', 'UserRole']

};

var inviteToken = exports.inviteToken = {
    properties: {
        UserName: {
            type: 'string'
        },
        EmailId: {
            type: 'string'
        }
    },
    required: ['UserName', 'EmailId']
};