import express from "express";
const app = express();
import dotenv from "dotenv"
import { connectDatabase } from "./config/db.connect.js";
dotenv.config({ path : "backend/config/config.env"})
import routes from "./routes/productRoutes.js"

app.use(express.json());

connectDatabase();
app.use("/api/v1",routes)
app.listen(process.env.PORT , () => {
    console.log(`server is running on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`);
}
)