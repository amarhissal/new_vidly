const winston = require('winston');
require('express-async-errors');
module.exports = function(){
    winston.exceptions.handle(
        new winston.transports.File({filename:'unhandle.log'})
    
    );
    
    process.on('unhandledRejection',(ex)=>{
       throw ex;
        });
    
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
}