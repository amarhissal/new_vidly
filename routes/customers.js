const {Customer,validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();



    router.get('/',async (req,res)=>{
        const customer = await Customer.find().sort('name');
            res.send(customer);
    });

    router.post('/',async(req,res)=>{
        let {error}= validate(req.body);
        if(error){
            res.status(400).send(error.details[0].message);
        }
        else{
        let customer = new Customer({
             name:req.body.name,
            isGold:req.body.isGold,
            phone:req.body.phone
            });
        customer =await customer.save();
        res.send(customer);
        }});


module.exports = router;
