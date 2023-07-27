const {Rental,validate} = require('../models/rental')
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',async(req,res)=>{
const rental = await Rental.find().sort('-dateOut');
res.send(rental);
});
 
router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
  }
  else{
    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
res.status(404).send("Invalid Customer!!");
    }
    else{
        const movie = await Movie.findById(req.body.movieId);
        if(!movie){
            return res.status(404).send("Invalid Movie!!"); 
        }
        else{
            if(movie.numberInStock===0){
            res.send("Movie not in stock!")
            }
            else{
                    let rental = new Rental({
                        customer:{
                            _id:customer._id,
                            name:customer.name,
                            phone:customer.phone
                        },
                        movie:{
                            _id:movie._id,
                            title:movie.title,
                            dailyRentalRate:movie.dailyRentalRate
                        }
                    });
                    rental = await rental.save();
                    movie.numberInStock--;
                    movie.save();
                    res.send(rental);
            }
        }
    }

  }
});

module.exports = router;