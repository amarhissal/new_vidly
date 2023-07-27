const {Movie,validate} = require('../models/movie');
const {Genre} = require('../models/genre')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
 
router.get('/',async (req,res)=>{
    const movie = await Movie.find().sort('name');
        res.send(movie);
});

router.post('/',async(req,res)=>{
    let {error}= validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    else{
        const genre =await Genre.findById(req.body.genreId);
        if(!genre){
            res.status(404).send("Invalid Genre!");

        }
        else{

    let movie = new Movie({
         title:req.body.title,
       genre:{
        _id:genre._id,
        name:genre.name
       },
       numberInStock:req.body.numberInStock,
       dailyRentalRate:req.body.dailyRentalRate
    
        });

    movie =await movie.save();
    res.send(movie);}
    }});

    module.exports = router;



