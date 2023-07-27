const validateId = require('../middleware/validateId')
const auth = require('../middleware/authenticate');
const admin = require('../middleware/admin');
const {Genre,validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



           router.get('/',async (req,res)=>{
                const genre = await Genre.find().sort('name');
                res.send(genre);
              
            });


        router.post('/',auth,async(req,res)=>{
            let {error}= validate(req.body);
            if(error){
                res.status(400).send(error.details[0].message);
            }
            else{
            let genre = new Genre({ name:req.body.name });
            genre =await genre.save();
            res.send(genre);
            }});
        
            router.put('/:id',validateId,async(req,res)=>{
                
                let {error}= validate(req.body);
                if(error){
                    res.status(400).send(error.details[0].message);
                }
                else {
                    let genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
                    if(!genre){
                        res.status(404).send("Genre With Given ID not Found!!");
            
                    }
                    else{
                        res.send(genre)
                    } 

                }
            
            });

        router.get('/:id',validateId,async (req,res)=>{
          
           let genre= await Genre.findById(req.params.id);
        
           if(!genre){
            res.status(404).send('Genre with this ID not found!');
           }
           else{
          
            res.send(genre)
           }
           
        });

             
       
       router.delete('/:id',[auth,admin],async(req,res)=>{
        let genre = await Genre.findByIdAndRemove(req.params.id);

        if(!genre){
            res.status(404).send("Genre With Given ID not Found!!");
        }
        else{
            res.send(genre);
        }

       });

   

        module.exports = router;



