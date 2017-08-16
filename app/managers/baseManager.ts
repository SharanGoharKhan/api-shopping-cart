/* Description: Wrapper for Basic Crud Operations
   Date Created: 16 August 2017
   Author: Sharan Khan
*/

import * as crypto from 'crypto';
import { constant_configs } from '../utils/constants';

export class Manager {
    constructor(){

    }

    /* Encrypt the given value */
    static encryptText(value: string){
        let cipher:any = crypto.createCipher('aes-256-ctr',constant_configs.app_hash_key);
        let crypted:any = cipher.update(value,'utf8','hex');
        crypted += cipher.final('hex');
    }

    /* Decrypt the given value */
    static decryptText(value: string){
        let decipher: any = crypto.createDecipher('aes-256-ctr',constant_configs.app_hash_key);
        let decrypted: any = decipher.update(value,'hex','utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    /*  Get all records */
    /*  API Metadata
        Method: GET 
        Params Informations
            table(collection/model) -- name of model/table to be queried
            object(json object) -- selection criterian object
            projection(json object) -- projection object to get the required attributes only
            sort(json object) -- sort criterian info
            limit(number) -- to fetch the limited records, if desired
    */
    static find(table:any,object?,projection?,sort?,limit?){
        return new Promise(function(resolve,reject){
            table.find(object,projection).sort(sort).limit(limit | 0).exec(function(err,result){
                err ? reject(err): resolve(result);
            })
        })
    }

    /* Get One Record */
    /*  API Metadata
        Method: POST
        Params Information
            table(collection/model) -- name of model/table to be queried
            object(json object) -- selection criterian object
            projection(json object) -- projection object to get the required attributes only 
    */
    static findOne(table:any,object?,projection?){
        return new Promise(function(resolve,reject){
            table.findOne(object,projection).lean().exec(function(err,result){
                err ? reject(err) : resolve(result);
            })
        })
    }

    /*  Save one item to db */
    /*  API Metadata
        Method: POST
        Params Information
            table(collection/model) -- name of model/table to be queried
            object(json object) -- selection criterian object 
    */
    static add(table:any,object:any){
        return new Promise(function(resolve,reject){
            object.save(function(err,result){
                err ? reject(err) :resolve(result);
            })
        })
    }

    /*  Update an item */
    /*  API Metadata
        Method: POST
        Params Information
            table(collection/model) -- name of model/table to be queried
            object(json object) -- selection criterian object
            filter -- json literal containing update criterian 
    */
    static update(table:any,object:any,filter:any){
        return new Promise(function(resolve,reject){
            table.update(filter,{$set:object}).exec(function(err,result){
                err ? reject(err) :resolve(result);
            })
        })
    }

    /*  Batch insert */
    /*  API Metadata
        Method: POST
        Params Information
            table(collection/model) -- name of model/table to be queried
            object(json object) -- selection criterian object 
    */
    static addMany(table: any, data:any){
        return table.insertMany(data);
    }

    /* find count based */
    /*  API Metadata
        Method: GET
        Params Information
            table(collection/model) -- name of model/table to bre queried
            object(json object) -- selection criterian object
    */    
     static count(table:any, object?){
         return table.count(object);
     }    
        
}