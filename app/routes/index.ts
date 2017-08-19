/* Description: Contains all
   Date Created: 16 August 2017
   Author: Sharan Khan
   Purpose: Contains all routes and calls it's respective controller
*/
/* ------ Import npm packages ------- */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
/* ------- API Controllers refereces start ------- */
import { User } from '../controllers/users';
import * as auth from './../middlewares/auth';
/* ------ Create objects of controllers ------- */
var userObj = new User();

/* ------- Intializing objects ------------ */
const router = express.Router();
auth.authenticate(jwt,router);

/* API is working route */
router.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
/*  Users apis */
router.get('/users/getAllUsers',userObj.getUsers);
router.post('/user/signup',userObj.addUser);

export const routes = router;