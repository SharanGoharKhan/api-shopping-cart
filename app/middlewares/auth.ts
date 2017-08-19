/*  Description: Authentication of routes and implementation of jwt
    Date Created: 20th August 2017
    Author: Sharan
*/
import * as _ from 'lodash';
import { constant_configs } from '../utils/constants';

export function authenticate(jwt,router) {
    console.log("Authenticate called");
    const secret_key: string = constant_configs.jwt_secret_key;
    let orignal_url: string = '';
    router.use(function(req,res,next) {
        /*  Check current route if it contains queryparams substring it 
            else check with public urls if not public url then check access_token
        */
        let url_param_flag: boolean = req.url.toString().indexOf('?') > -1;
        if(url_param_flag) {
            let url_arr = req.url.split('?');
            orignal_url = url_arr[0];
        } else {
            orignal_url = req.url;
        }
        let url_config = _.find(constant_configs.public_urls,function(url:any) {
            return orignal_url.toString() == url.toString();
        })
        if(url_config != '' && url_config != null && url_config != undefined) {
            next();
        } else {
            console.log(">>>>>>>>>>>>>");
            console.log("Reqest headers",req.headers);
            console.log(">>>>>>>>>>>>>");
            const user_id = req.headers['_id'];
            let token = req.headers['access-token'];
            if(token && token !='') {
                jwt.verify(token,secret_key,function(err,decoded){
                    if(err) {
                        return res.status(401).json({success:false,message:'Unauthorized. Invalid token provided'});
                    } else {
                        req.decoded = decoded;
                        if(user_id == undefined || user_id == '' || user_id == null) {
                            return res.status(400).json({success:false,error:'Invalid request. Please try again.'});
                        } else {
                            next();
                        }
                    }
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        }
    });
}