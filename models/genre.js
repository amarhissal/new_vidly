const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    } 
 }) ;
  const Genre = new mongoose.model('Genre',genreSchema);

  function validationOfGenre(body){
    let genreSchema=Joi.object({name:Joi.string().min(3).max(50).required()});
    return res=genreSchema.validate(body);
    }

    module.exports.Genre = Genre;
    module.exports.genreSchema = genreSchema;
    module.exports.validate = validationOfGenre;
