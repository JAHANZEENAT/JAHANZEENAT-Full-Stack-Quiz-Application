const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name :  String,
    email : String,
    password : String,
    score : {
        type :Number,
        default : 0
    }
})

const userModel = mongoose.model("user",userSchema)
module.exports = userModel