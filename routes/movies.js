const {Movie,validate} = require('../models/movie');
const {Genre} = require('../models/genre')
const auth = require('../middleware/authenticate');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
 
router.get('/',async (req,res)=>{
    const movie = await Movie.find().sort('name');
        res.send(movie);
});

router.get('/:id',async (req,res)=>{
          
    let movie= await Movie.findById(req.params.id);
 
    if(!movie){
     res.status(404).send('Movie with this ID not found!');
    }
    else{
   
     res.send(movie)
    }
    
 });


router.post('/',auth,async(req,res)=>{
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
       dailyRentalRate:req.body.dailyRentalRate,
       isLiked:req.body.isLiked
    
        });

    movie =await movie.save();
    res.send(movie);}
    }});

   
    router.put("/:id",auth, async (req, res) => {
   

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
      
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send("Invalid genre.");
      
        const movie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            title: req.body.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            isLiked:req.body.isLiked
          },
          { new: true }
        );
      
        if (!movie)
          return res.status(404).send("The movie with the given ID was not found.");
      
        res.send(movie);
      });
      

    router.delete('/:id',[auth,admin],async(req,res)=>{
        let movie = await Movie.findByIdAndRemove(req.params.id);

        if(!movie){
            res.status(404).send("Movie With Given ID not Found!!");
        }
        else{
            res.send(movie);
        }

       });


    module.exports = router;



