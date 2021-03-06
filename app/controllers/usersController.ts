/* Description: User APIs
    Date Created: 16th August 2017
    Author: Sharan
*/

import * as jwt from 'jsonwebtoken';
import { constant_configs } from '../utils/constants';
import *  as async from 'async';
import { Users } from '../models/usersModel';
import { UserManager } from '../managers/usersManager';
/* ---------- APIS ------------- */
export class UserController {
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
        Response: User Info, Token, User ID
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
            return res.status(200).json({data,token:token,success:true});
        })
        .catch(err =>
        {
            console.log("error",err);
            return res.status(500).json({err});
        });
    }
    /*  Login User
        Method: POST
        Request: Email, Password
        Response: User data and a token
    */
    userLogin(req,res) {
        let userInfo = req.body;
        userInfo.password = UserManager.encryptText(userInfo.password);
        console.log(userInfo.email);
        UserManager.findOne(Users,{email:userInfo.email})
        .then(data =>{
            if(data == null || data == undefined || data == '')
                return res.status(404).json({error: 'Error occured while getting users.',success:'false'})
            else
            {
                var token = jwt.sign(data,constant_configs.jwt_secret_key,{
                    expiresIn: 60 * 60 *24 //expires in 25 hours
                });
                return res.status(200).json({data,token:token,success:true});
            }
        })
        .catch(err=>{
            return res.status(500).json({error:err,success:false});
        })
     }    
}