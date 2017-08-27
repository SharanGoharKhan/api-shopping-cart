/* Description: Contains all
   Date Created: 16 August 2017
   Author: Sharan Khan
   Purpose: Contains all routes and calls it's respective controller
*/
/* ------ Import npm packages ------- */
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
/* ------- API Controllers refereces start ------- */
import * as auth from './../middlewares/auth';
import { UserController } from '../controllers/usersController';
/* ------ Create objects of controllers ------- */
var userController = new UserController();

/* ------- Intializing objects ------------ */
const router = express.Router();
auth.authenticate(jwt,router);

/* API is working route */
router.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
/*  Users apis */
router.get('/users/getAllUsers',userController.getUsers);
router.post('/user/signup',userController.addUser);
router.post('/user/login',userController.userLogin);

export const routes = router;