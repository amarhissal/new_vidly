const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1250,
        unique: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id ,isAdmin:this.isAdmin,name:this.name,email:this.email}, config.get('jwtPrivateKey'));
    return token;
}
const User = new mongoose.model('User', userSchema);

function validationOfUser(body) {
    let userSchema = Joi.object(
        {
            name: Joi.string().min(3).required(),
            email: Joi.string().min(3).required().email(),
            password: Joi.string().min(3).required(),
            isAdmin:Joi.boolean()
        });
    return res = userSchema.validate(body);
}

module.exports.User = User;
module.exports.validate = validationOfUser; 
