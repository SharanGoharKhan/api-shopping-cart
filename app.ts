/* Description: Start of app file
   Date Created: 16 August 2017
   Author: Sharan Khan
*/
import * as express from 'express';
import * as mongoose from 'mongoose';
import { config } from './app/config/config';

var app = express();
/* Database Connection */
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error',function(err:any) {
    console.log('root db connection');
    console.log('error            ',err);
    console.log('\n\n\n\n\n');
    throw new Error('Unable to connect tot database at '+config.db);
});
