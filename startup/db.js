const mongoose = require('mongoose');
const env = require('dotenv').config();

module.exports =function(){
    
mongoose.connect(process.env.db)
.then(()=>{
    console.log(`Connected to ${process.env.db} ...`);
})
.catch((e)=>{
    console.log(e);
})

}