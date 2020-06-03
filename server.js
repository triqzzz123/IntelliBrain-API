const server =require("express");
const bcrypt=require("bcrypt-nodejs");
const cors= require("cors")
const file = server();
file.use(cors())
file.use(server.json());
const knex=require('knex');
const register=require('./controllers/Register');
const signin=require('./controllers/Signin');
const profile=require('./controllers/Profile');
const image=require('./controllers/Images');

 const db=knex ({
   client: 'pg',
   connection: {
     host : '127.0.0.1',
     user : 'postgres',
     password : 'test',
     database : 'intellibrain'
   }
 })

file.get('/',(req,resp)=>{ 
    resp.send(database.user1)
})

file.post('/signin',(req,resp)=>{signin.handleSignin(req,resp,db,bcrypt)
})

file.post('/register',(req,resp)=>
{register.handleRegister(req,resp,db,bcrypt)
})

file.get('/profile/:id',(req,resp)=>{
profile.handleProfileget(req,resp,db)
})

file.put('/images',(req,resp)=>{
  image.handleImage(req,resp,db)
  })

file.post('/imageUrl',(req,resp)=>{
  image.handleAPIcall(req,resp)
})
 
file.listen(3000,()=>{
    console.log("hey 3000")
})
