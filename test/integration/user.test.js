const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const payload =
 {
    _id:new mongoose.Types.ObjectId().toHexString(),
    isAdmin:true
};
 describe('generateAuthToken',()=>{
it('should return a valid JWT',()=>{
    const user = new User(payload);
   const token =  user.generateAuthToken();
   const decoded = jwt.verify(token,process.env.jwtPrivateKey);
    expect(decoded).toMatchObject(payload);

})

 });