/* Description: Configuring express
   Date Created: 16 August 2017
   Author: Sharan Khan
*/
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routes } from '../routes/index';
import * as methodOverride from 'method-override';
import * as logger from 'morgan';
module.exports = function(app, config) {
    /* ---- Intialize bodyParse used for form post request ----- */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    /* CORS Handling */
    app.use(cors());
    app.use(function(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        next();
    });
    /* Used for logging request */
    app.use(logger('dev'));
    /* ---- Method override package will give accecss to put and delete verbs where it's not supported ---- */
    app.use(methodOverride());
    /*---- Intialize routes ------ */
    app.use('/',routes);
    return app;
};