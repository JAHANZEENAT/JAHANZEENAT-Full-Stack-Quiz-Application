const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')

const userModel = require('./models/user')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : false }));
app.use(session({
  secret: 'zeenat1111', // Change this to a random secret key
  resave: false,
  saveUninitialized: true
}));
mongoose.connect("mongodb://localhost:27017/quiz-app")

app.post('/signup',async (req,res)=>{
    const body = req.body;
   await userModel.create({
        name : body.name,
        email : body.email,
        password : body.password,
    })
    return res.status(201).send({msg:"success"})
})

app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email,password})
    req.session.userid =  user._id
    if (!user) {
        console.log("Not logged in")
        res.status(401).json({
          message: "Login not successful",
          error: "User not found",
        })
      } else {
        console.log("logged in")
        res.status(200).json({
          name : user.name,
          email : user.email,
        })
      }
})

app.post('/setscore',async(req,res)=>{
    const body = req.body;
    const filter = {email : body.email}
    const update = {score : body.userscore}
    
    await userModel.findOneAndUpdate(filter,update,{returnOriginal : false})
   
return res.status(201).send({msg:"success"})

}); 
app.get('/getscore',async(req,res)=>{
  const body = req.body;
  const user = await userModel.findOne(body.email)
  return res.json(user.score);
})
const PORT = 8002
app.listen(PORT, ()=>{
    console.log("server is connected")
})