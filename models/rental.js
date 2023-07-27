const mongoose = require('mongoose');
const moment =require('moment');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const rentalSchema =new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:3,
                maxlength:255
                },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:5,
                maxlength:10
            }
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:3,
                maxlength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            },

        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }

});




rentalSchema.methods.return = function(){
    this.dateReturned=new Date();
    const rentalDays = moment().diff(this.dateOut,'days');

    this.rentalFee =rentalDays*this.movie.dailyRentalRate;
}
const Rental =  mongoose.model('Rental',rentalSchema);

function validateRental(body){
    const schema =Joi.object({
        customerId:Joi.objectid().required(),
        movieId:Joi.objectid().required()
    })
    return res = schema.validate(body);
}
    module.exports.Rental = Rental;
    module.exports.validate = validateRental;