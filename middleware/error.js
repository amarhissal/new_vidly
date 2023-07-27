const winston = require('winston');

module.exports = function (err,req,res,next){
    winston.error(err.message,err);
    console.log('Something failed!!!..');
    res.status(500).send('Something failed!!!..')

}