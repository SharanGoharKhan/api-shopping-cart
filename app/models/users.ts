/* Description: Model schema for users
   Date Created: 16th August 2017
   Author: Sharan Khan
*/
import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
const Users = new Schema({
    first_name: {
        type: String,
        required: [true,'First name is required']
    },
    last_name: {
        type: String,
        required: [true,'Last name is required']
    },
    is_deleted: {
        type:Boolean,
        enum: [true,false],
        default: false
    },
    country: {
        name: {
            type: String
        },
    },
    address: {
        type: String
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
    }
});

module.exports = Users;