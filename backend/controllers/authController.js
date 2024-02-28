import catchAsyncErr from "../middleware/catchAsyncErr.js";
import User from "../models/user.js";
import assignToken from "../utils/assignToken.js";
import ErrorHandler from "../utils/errorHandler.js";
//register user = api/v1/register
export const registerUser =  catchAsyncErr(async(req,res,next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password
    })
    // const token = user.getJwtToken()
    // res.status(201).json({
    //     token
    // })
    assignToken(user,201,res)
})
//login user = api/v1/login
export const loginUser =  catchAsyncErr(async(req,res,next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password',400))
    }
    //find user in the database......
    const user = await User.findOne({ email}).select("+password")
     if(!user){
        return next(new ErrorHandler('Invalid email & password',401))//unauthenticate
    }
    //check if password is correct...
    const isPaaswordMatched = await user.comparePassword(password);
    if(!isPaaswordMatched){
        return next(new ErrorHandler("Invalid Email or Paasword",401))
    }

    // const token = user.getJwtToken()
    // res.status(200).json({
    //     token
    // })
    assignToken(user,201,res)

})
//logout user = api/v1/logout
export const logoutUser =  catchAsyncErr(async(req,res,next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        message: "Logged Out!"
    })
})