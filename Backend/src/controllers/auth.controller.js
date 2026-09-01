const userModel = require("../models/user.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");



/**
 * @name registerUserController
 * @description register a new user , expects username , email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    const {username , email , password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message : "All fields are required"})
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[{username} ,{email}]
    })
    if(isUserAlreadyExist){
        return res.status(400).json({message : "User already exist"})
    }

    const hash = await bcryptjs.hash(password, 10);
    
    const user = await userModel.create({
        username ,
        email ,
        password :hash
    })

    const token = jwt.sign(
        {id :user._id , username :user.username},
        process.env.JWT_SECRET,
        {expiresIn :"1d"}
    )

    res.cookie("token" , token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message  :"user registered successfully",
        user :{
            id : user._id,
            username :user.username,
            email :user.email
        }
    })
}


/**
 * @name loginUserController
 * @description login user after validating credentials
 * @access Public
 */
async function loginUserController(req , res) {
    
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        })
    }

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message : "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid Email or Password"
        })
    }

    const token = jwt.sign(
        {id :user._id , username :user.username},
        process.env.JWT_SECRET,
        {expiresIn :"1d"}
    )

    res.cookie("token" , token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message  :"user logged in successfully",
        user :{
            id : user._id,
            username :user.username,
            email :user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add to the blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
    const {token} = req.cookies;
    
    if(token){
        await tokenBlacklistModel.create({token});
    }

    res.clearCookie("token");

    return res.status(200).json({
        message :"User logged out successfully"
    })
    
}


/**
 * @name getMeController
 * @description get logged in user info 
 * @access Private
 */
async function getMeController(req , res){
    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message : "user details fetch successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

module.exports = {registerUserController , loginUserController , logoutUserController , getMeController}