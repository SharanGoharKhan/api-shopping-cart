/* Description: Configuring express
   Date Created: 16 August 2017
   Author: Sharan Khan
*/
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routes } from '../routes/index';

module.exports = function(app, config) {
/* ---- Intialize bodyParse used for form post request ----- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/* CORS Handling */
app.user(cors());
/*---- Intialize routes ------ */
app.use('/',routes);
}