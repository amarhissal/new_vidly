
const env = require('dotenv').config();

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        console.error('FATAL ERROR : jwtPriavteKey is not defined');
        process.exit(1);
    }  
}
