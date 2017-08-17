/* Description: Contains all
   Date Created: 16 August 2017
   Author: Sharan Khan
   Purpose: Contains all routes and calls it's respective controller
*/
/* ------ Import npm packages ------- */
import * as express from 'express';

/* ------- API Controllers refereces start ------- */
import { User } from '../controllers/users';

/* ------ Create objects of controllers ------- */
var userObj = new User();

/* ------- Intializing objects ------------ */
const router = express.Router();
/* API is working route */
router.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
/*  Users apis */
router.get('/users/getAllUsers',userObj.getUsers);

export const routes = router;