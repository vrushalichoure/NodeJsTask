const Ajv = require('ajv');
import { generateToken, verifyToken, decodeToken } from '../auth/jasonwebtoken';
import { setInvitationTokenDetails, checkInvitationToken, getAllInviteToken } from '../repository/adminRepository';
import redisClient from '../redis';
import { UserRole,ErrorCodeMessage } from '../models/Constant';
import { Userlogin, Adminlogin, inviteToken } from '../schemas/schemas'
import { isNullOrUndefined } from 'util';
const ajv = new Ajv();


const routes = (app) => {
    // Authentication With Jwt Token
    app.post('/login', async (req, res) => {
        switch(req.body.UserRole){
            case UserRole.user:
            const validation = ajv.validate(Userlogin, req.body);
            if (validation) {
                const response = await checkInvitationToken(req.body.InviteToken);
                if (response) {
                    const jwttoken = generateUserToken(req.body);
                    res.status(200).send({ token: jwttoken, message: ErrorCodeMessage.Success });
                } else {
                    res.status(401).send({ data: ErrorCodeMessage.Unaouthrized , message: ErrorCodeMessage.Failure });
                }
            } else {
                res.status(400).send({ data: ErrorCodeMessage.Validation , message: ErrorCodeMessage.Failure });
            }
            break;
            case UserRole.admin:
                    const jwttoken = generateUserToken(req.body);
                    res.status(200).send({ token: jwttoken, message: ErrorCodeMessage.Success });
               
            break;
            default:
                    res.status(401).send({ data: ErrorCodeMessage.Unaouthrized , message: ErrorCodeMessage.Failure });
            
        }
    });

    // Call User Toke
    const generateUserToken = (data) => {
        const jwtToken = generateToken(data);
        redisClient.set('UserData', jwtToken);
        return jwtToken;
    };

    // Generate and Store User Invitation Token
    app.post('/inviteToken', checkToken, async (req, res) => {
        const validation = ajv.validate(inviteToken, req.body);
        if (validation) {
            redisClient.get('UserData', async (error, token) => {
                const response = await verifyToken(token);
                if (response.isError) {
                    res.status(401);
                } else {
                    const userData = decodeToken(token);
                    if (userData.UserRole === UserRole.admin) {
                        const data = await setInvitationTokenDetails(req.body);
                        res.status(201).send({ inviteToken: data, message: true });
                    } else {
                        res.status(401).send({ message: 'You dont have Access' });
                    }
                }
            });
        } else {
            res.status(400).send({ message: 'Validation Error' });
        }

    });



    // List of all token for admin
    app.get('/getAllInviteToken', checkToken, async (req, res) => {
        redisClient.get('UserData', async (error, token) => {
            const response = await verifyToken(token);
            if (response.isError) {
                res.status(401).send({data:ErrorCodeMessage.Unaouthrized ,message:ErrorCodeMessage.Failure});
            } else {
                const userData = decodeToken(token);
                if (userData.UserRole === UserRole.admin) {
                    const data = await getAllInviteToken();
                    res.status(200).send(data);
                } else {
                    res.status(401).send({data:ErrorCodeMessage.Unaouthrized ,message:ErrorCodeMessage.Failure});
                }
            }

        });
    });


    // verify Token
    function checkToken(req, res, next) {
        const authorization = req.get('Authorization');
        if (authorization !== 'undefined') {
            const bearerToken = authorization.split(' ')[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(401).send({data:ErrorCodeMessage.Unaouthrized ,message:ErrorCodeMessage.Failure});
        }
    }
}
export default routes;
