import mongoose from "mongoose";
import Product from "../models/product.js";
import products from "./data.js"

 
 const seedProducts = async () => {
    try{
await mongoose.connect("mongodb://127.0.0.1:27017/shopit");
await Product.deleteMany();
console.log("deleted!!!!");
await Product.insertMany(products)
console.log("inserted!!!!");

process.exit();

    } catch(error){
console.log(error.message);
process.exit();
    }
 }
 seedProducts();