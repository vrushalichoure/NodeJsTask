export const Adminlogin = {
    properties: {
        InviteToken: {
            type: 'string',
            range: [6-12]
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

export const Userlogin = {
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
    required: ['InviteToken','UserName', 'EmailId', 'UserRole']

};

export const inviteToken = {
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

