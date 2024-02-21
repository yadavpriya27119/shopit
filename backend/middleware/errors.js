import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res , next) => {
    let error = {
        statusCode: err?.statusCode ||  500,
        message: err?.message || "Internal Server Error",
    };
    //handle Invalid Mongoose Id Error
    // if(err.name === 'CastError'){
    //     const message = `Resource not found, Invalid: ${err?.path}`
    //     error = ErrorHandler(message,404)
    // }
    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err.stack,
        });
    }
    if(process.env.NODE_ENV === 'PRODUCTION') {
        res.status(error.statusCode).json({
            message: error.message
        });
    }
   
}