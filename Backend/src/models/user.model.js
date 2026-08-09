const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        unique : [true , "username already taken..!!"],
        required : true
    }, 
    email:{
        type : String,
        unique : [true , "account already exits with this email address"],
        required : true
    },
    password :{
        type : String ,
        password :true
    }  
})

const usermodel = mongoose.model("users" , userSchema)
module.exports = usermodel
