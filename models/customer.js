const mongoose = require('mongoose');
const Joi = require('joi');


const Customer =  mongoose.model('Customer',new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        minlength:3,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50}
    }));

    function validationOfCustomer(body){
        let customerSchema=Joi.object({
            name:Joi.string().min(3).max(50).required(),
            phone:Joi.string().min(3).max(10).required(),
            isGold:Joi.boolean()
        });
        return res=customerSchema.validate(body);
        }
       
        module.exports.Customer = Customer;
        module.exports.validate = validationOfCustomer;
