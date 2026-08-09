const mongoose = require('mongoose')

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Interview Pilot connected to MongoDB Atlas")
    }catch(error){
        console.log("Failed to connect to Interview Pilot",error)
    }
}

module.exports = connectDB