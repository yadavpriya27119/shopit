export default (controllerFunction) => (req,res,next) => 
Promise.resolve(controllerFunction(req,res))