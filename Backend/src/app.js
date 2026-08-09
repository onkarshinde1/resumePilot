const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

// require all the routes here 
const authRouter = require('./routes/auth.routes')

// using all the routes here 
app.use("/api/auth" , authRouter)

/**
 * @route POST api/auth/register
 * @description register a new user
 * @access Public
 */

authRouter.post("/register", (req, res)=>{
    
})



module.exports = app
