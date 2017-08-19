/* Description: User APIs
    Date Created: 16th August 2017
    Author: Sharan
*/

import { UserManager } from '../managers/users';
import { Users } from '../models/users';
import * as jwt from 'jsonwebtoken';
import { constant_configs } from '../utils/constants';
/* ---------- APIS ------------- */
export class User {
    constructor() {
    }
    /*  Get all users list 
        Method: GET
    */
    getUsers(req:any,res:any) {
        UserManager.find(Users)
        .then(data => {
            return res.status(200).json({data});
        })
        .catch(err => {
            return res.status(500).json({error: 'Error occured while getting users.',details:err});
        });
    }
    /*  Create User
        Method: POST
    */
    addUser(req:any,res:any) {
        let userInfo = req.body;
        /* Encrypt password */
        userInfo.password = UserManager.encryptText(userInfo.password);
        let newUser = new Users(userInfo);
        UserManager.add(newUser,{})
        .then(data =>
        {
            var token = jwt.sign(data,constant_configs.jwt_secret_key,{
               expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
            return res.status(200).json({data,token:token});
        })
        .catch(err =>
        {
            console.log("error",err);
            return res.status(500).json({err});
        });
    } 
}