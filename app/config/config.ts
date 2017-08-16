/* Description: Configurations for mongodb 
   Date Created: 16 August 2017
   Author: Sharan Khan
*/
const configs = {
    development: {
        app: {
            name: 'shopping-cart'
        },
        port: 3000,
        db: 'mongodb://127.0.0.1:27017/shopping_cart'
    }
}
export const config = configs['development'];