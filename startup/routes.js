const express = require('express');
const genre = require('../routes/genres');
const customer =require('../routes/customers')
const movie = require('../routes/movies')
const rental = require('../routes/rentals');
const user = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const returns = require('../routes/returns');


module.exports = function(app){
    app.use(express.json());
app.use('/api/genres',genre);
app.use('/api/customers',customer);
app.use('/api/movies',movie)
app.use('/api/rentals',rental);
app.use('/api/users',user);
app.use('/api/auth',auth);
app.use('/api/returns',returns);

app.use(error);

}