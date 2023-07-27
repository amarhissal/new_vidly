 const jwt = require('jsonwebtoken');
 const config = require('config');

 function auth(req,res,next){
    const token = req.header('x-nm-token');

if(!token) return res.status(401).send("Access Denied No Token Provided!");

try{
const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
    }
catch(e){
res.status(400).send("Invalid Token!");
}

 }
    module.exports =  auth;