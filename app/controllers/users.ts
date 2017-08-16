/* Description: User APIs
    Date Created: 16th August 2017
    Author: Sharan
*/

import { UserManager } from '../managers/users';
import * as Users from '../models/users'
/* ---------- APIS ------------- */
export class User {
    constructor() {
    }
    /* Get all users list */
    getUsers(req,res) {
        UserManager.find(Users)
        .then( data => {
            return res.status(200).json({data});
        })
        .catch( err => {
            return res.status(500).json({error: 'Error occured while getting users.',details:err});
        });
    }
}