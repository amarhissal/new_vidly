const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');

let server;
describe('/api/genres',()=>{
 beforeEach(()=>{server = require('../../index');});
 afterEach(async()=>{
    await Genre.deleteMany({}).exec();             
    await server.close();   
    });

    describe('GET/',()=>{
    it('Should return all genres',async()=>{
      await  Genre.collection.insertMany([
            {name:"genre1"},
            {name:'genre2'},
            {name:'genre3'},

        ])
       const res =await request(server).get('/api/genres');
       expect(res.status).toBe(200);
       expect(res.body.length).toBe(3);
       expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();
         });

    })  

 describe('GET/:id',()=>{
    it('should return genre if valid id is passed',async()=>{
        const genre = new Genre({name:"genre1"});
        await genre.save();
        const res = await request(server).get('/api/genres/'+genre._id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name',genre.name);
    })

    it('should return 404 if invalid id is passed',async()=>{
 
        const res = await request(server).get('/api/genres/1');
        expect(res.status).toBe(404);
   
     
    })
    })
    
   describe('POST/',()=>{
    it('should return 401 if client is not logged in',async()=>{
        const res = await request(server).post('/api/genres').send({name:"genre"})
        expect(res.status).toBe(401)
     })

     it('should return 400 if genre length is more than 50 char',async()=>{
        
        const token = new User().generateAuthToken();
        const name = new Array(52).join('a')
        
        const res = await request(server).post('/api/genres').set('x-nm-token',token).send({name:name})
        expect(res.status).toBe(400)
     })

     
     it('should return  genre if valid genre is passed',async()=>{
        
        const token = new User().generateAuthToken();
    
        
        const res = await request(server).post('/api/genres').set('x-nm-token',token).send({name:'genrevalid'})
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('name','genrevalid')
     })
   }) 
    


})
