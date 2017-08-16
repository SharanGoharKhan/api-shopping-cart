/*  Description: Dedicated manager for User Apis
    Date Created: 16 August 2017
    Author: Sharan Khan
    Purpose: Conains apis and methods specific to users
    Proto: Inherit from base manager
*/

import { Manager } from './baseManager';
import * as Users from '../models/users';
export class UserManager extends Manager {
    constructor(){
        super();
    }
}