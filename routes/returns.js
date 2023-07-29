const mongoose = require('mongoose');
const Joi = require('joi');
const moment =require('moment');
const {Rental} = require('../models/rental')
const{Movie} = require('../models/movie');
const express = require('express');
const auth = require('../middleware/authenticate')
const router = express.Router();
const validate=require('../middleware/validate');


router.post('/',[auth,validate(validateReturn)],async(req,res)=>{
   
   
    const rental = await Rental.findOne({
        'customer._id':req.body.customerId,
        'movie._id':req.body.movieId
    })

    if(!rental) return res.status(404).send('Rental not found')
    if(rental.dateReturned) return res.status(400).send('Rental already Processed');
    
    rental.return();
    await rental.save();

     await Movie.updateOne({_id:rental.movie._id},{
        $inc:{numberInStock:1}
    });


    return res.send(rental)
})

function validateReturn(body){
    const schema =Joi.object({
        customerId:Joi.objectid().required(),
        movieId:Joi.objectid().required()
    })
    return res = schema.validate(body);
}

module.exports = router;