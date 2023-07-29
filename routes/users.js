const auth = require('../middleware/authenticate');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User,validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');;
    res.send(user);

})

router.post('/',async(req,res)=>{
    let {error}= validate(req.body);

    if(error) { 
        res.status(400).send(error.details[0].message);
    }
    else{
        let user = await User.findOne({email:req.body.email});
        if(user)
         {
             res.status(400).send("User Already Exists");}
             else{
                user = new User(_.pick(req.body,["name","email","password",'isAdmin']));
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password,salt);
                 await user.save();
                 const token = user.generateAuthToken();
                 res.header('x-nm-token',token).send(_.pick(user,["_id","name","email"]));
     }
    }  
});


            module.exports = router;
