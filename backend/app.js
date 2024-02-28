import express from "express";
const app = express();
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/db.connect.js";

process.on('uncaughtException',(err) =>{
    console.log(`ERROR: ${err}`);
    console.log("shutting down due to uncaught exception.")
    process.exit(1)
})

dotenv.config({ path : "backend/config/config.env"})
import routes from "./routes/productRoutes.js"
import authRoutes from "./routes/auth.js"
import errorMiddleware from "./middleware/errors.js";

connectDatabase();
app.use(express.json())
app.use(cookieParser())
// console.log(hello);
app.use("/api/v1",routes)
app.use("/api/v1",authRoutes)
app.use(errorMiddleware)
const  server = app.listen(process.env.PORT , () => {
    console.log(`server is running on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`);
}
)
process.on('unhandledRejection',(err) => {
    console.log(`error::${err}`);
    console.log('shutting down server due to unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    })
})