/* Description: Model schema for users
   Date Created: 16th August 2017
   Author: Sharan Khan
*/
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
const users = new Schema({
    gender: {
        type: String,
        required:[true, 'Gender is required']
    },
    first_name: {
        type: String,
        required: [true,'First name is required']
    },
    last_name: {
        type: String,
        required: [true,'Last name is required']
    },
    birthday: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    updated_at: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    is_deleted: {
        type:Boolean,
        enum: [true,false],
        default: false
    },
});
export const Users = mongoose.model('Users',users);
//module.exports = Users;