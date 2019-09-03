import db from './database';
import {InviteTokenRegex} from '../models/Constant'
const GetAllInviteToken = 'usp_get_all_invite_token';
const SetInviteTokenDetail = 'usp_set_invite_token_detail';
const CheckInviteTokenDetail = 'usp_check_invite_token';
const RandExp = require('randexp').randexp;


// store token in databser
export const setInvitationTokenDetails = async (data) => {
    const inviteTokenValue = RandExp(InviteTokenRegex);
    const params = [inviteTokenValue, data.UserName, data.EmailId,data.UserRole];
    await db.Execute(SetInviteTokenDetail, params);
    return inviteTokenValue;
};
// check token exits and in not expired
export const checkInvitationToken = async (inviteTokenValue) => {
    const params = [inviteTokenValue];
    const result = await db.Execute(CheckInviteTokenDetail, params);
    return result[0].Result;
};

// list of All Records As Admin
export const getAllInviteToken = async () => {
    const result = await db.Execute(GetAllInviteToken);
    return result;
};
