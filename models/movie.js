const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

  const Movie = mongoose.model('Movie',new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:255
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        min:0,
        max:255,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        min:0,
        max:255,
        required:true
    },
    isLiked:{
        type:Boolean,
        default:false
    }
    
  }));

  function validateMovie(body){
    const movieSchema= Joi.object({
        title : Joi.string().min(3).max(255).required(),
        genreId : Joi.objectid().required(),
        numberInStock :Joi.number().min(0).required(),
        dailyRentalRate :Joi.number().min(0).max(255).required(),
        isLiked:Joi.boolean()
      
    });
     return res= movieSchema.validate(body);
  }

  module.exports.Movie = Movie;
  module.exports.validate = validateMovie;

