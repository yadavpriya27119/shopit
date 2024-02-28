import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErr from "./catchAsyncErr.js";
import User from "../models/user.js"
import  jwt  from "jsonwebtoken";

//check if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErr(async (req, res, next) => {
     const {token}=req.cookies
     console.log(token);
     if(!token){
        return next(new ErrorHandler("Login first to access this resource",401))//unauthorized
     }
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     console.log(decoded);
     req.user = await User.findById(decoded.id)
     next()
})