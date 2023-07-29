let request = require('supertest');
const moment =require('moment');
const mongoose = require('mongoose');
const {Rental} = require('../../models/rental')
const{Movie} = require('../../models/movie');

const {User} = require('../../models/user')

let server ;

describe('/api/returns',()=>{
    let customerId; 
    let movieId;
    let rental;
    let movie;
    beforeEach(async()=>{server = require('../../index')
    customerId =   new mongoose.Types.ObjectId();
    movieId =  new  mongoose.Types.ObjectId();

    movie = new Movie({
        _id:movieId,
        title:"AMAAs",
        dailyRentalRate:3,
        genre:{name:'4566'},
        numberInStock:10
    });
    await movie.save();


    
     rental = new Rental({
        customer:{
            _id: customerId,
            name:'123',
            phone:'112255555',

        },
        movie:{
            _id:movieId,
            title:'ashiqui',
            dailyRentalRate:50
        }
    })
    await rental.save();
    });
    afterEach(async()=>{
        await Rental.deleteMany({}); 
       await server.close();  
                 
       });

       it('should work',async()=>{
        const result = await Rental.findById(rental._id);
        expect(result).not.toBeNull();
       })

       it('should return 401 if client is not lgged in',async()=>{
        const res = await request(server)
                            .post('/api/returns')
                            .send({movieId,customerId});
        expect(res.status).toBe(401)                   
       })

       
       it('should return 400 if customerId is not provided',async()=>{
        const token = new User().generateAuthToken();

        const res = await request(server)
                            .post('/api/returns')
                            .set('x-nm-token',token)
                            .send({movieId});
        expect(res.status).toBe(400)                   
       })

       it('should return 400 if movieId is not provided',async()=>{
        const token = new User().generateAuthToken();

        const res = await request(server)
                            .post('/api/returns')
                            .set('x-nm-token',token)
                            .send({customerId});
        expect(res.status).toBe(400)                   
       })

       it('should return 404 if no rental present',async()=>{
        await Rental.deleteMany({});
        const token = new User().generateAuthToken();
        const res = await request(server)
                            .post('/api/returns')
                            .set('x-nm-token',token)
                            .send({customerId,movieId});
        expect(res.status).toBe(404)                   
       })

       it('should return 400 if  rental already processed',async()=>{
       rental.dateReturned = new Date();
       await rental.save();
        const token = new User().generateAuthToken();
        const res = await request(server)
                            .post('/api/returns')
                            .set('x-nm-token',token)
                            .send({customerId,movieId});
        expect(res.status).toBe(400)                   
       })

       it('should return 200 if  rental processed',async()=>{
    
         const token = new User().generateAuthToken();
         const res = await request(server)
                             .post('/api/returns')
                             .set('x-nm-token',token)
                             .send({customerId,movieId});
         expect(res.status).toBe(200)                   
        })

        it('should set returnDate if input is valid',async()=>{
    
            const token = new User().generateAuthToken();
            const res = await request(server)
                                .post('/api/returns')
                                .set('x-nm-token',token)
                                .send({customerId,movieId});
            const rentalInDb = await Rental.findById(rental._id)
                                
            expect(rentalInDb.dateReturned).toBeDefined()                   
           })

           
        it('should calculate dailyRentalRate',async()=>{
            rental.dateOut = moment().add(-7,'days').toDate();
            rental.save();
            const token = new User().generateAuthToken();
            const res = await request(server)
                                .post('/api/returns')
                                .set('x-nm-token',token)
                                .send({customerId,movieId});
            const rentalInDb = await Rental.findById(rental._id)

                                
            expect(rentalInDb.rentalFee).toBe(350)                   
           })

           it('should increase numberIn stock',async()=>{
          
            const token = new User().generateAuthToken();
            const res = await request(server)
                                .post('/api/returns')
                                .set('x-nm-token',token)
                                .send({customerId,movieId});
            const movieInDb = await Movie.findById(movie._id)

                                
            expect(movieInDb.numberInStock).toBe(11);                  
           })

           it('should return the returns object',async()=>{
          
            const token = new User().generateAuthToken();
            const res = await request(server)
                                .post('/api/returns')
                                .set('x-nm-token',token)
                                .send({customerId,movieId});
            const rentalInDb = await Rental.findById(rental._id)
               
            expect(res.body).toHaveProperty('dateOut');   
            expect(res.body).toHaveProperty('dateReturned');
            expect(res.body).toHaveProperty('customer');
            expect(res.body).toHaveProperty('movie');                  



           })

        
})