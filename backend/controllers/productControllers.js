import catchAsyncErr from "../middleware/catchAsyncErr.js"
import Product from "../models/product.js"
import APIFilters from "../utils/apiFilters.js"
import ErrorHandler from "../utils/errorHandler.js"
export const getProducts = catchAsyncErr ( async (req, res) => {
    const resPerPage = 4;
    const apiFilters= new APIFilters(Product, req.query).search().filters()
    let products = await apiFilters.query
    let filteredProductCounts = products.length;
    // const products = await Product.find()
    apiFilters.pagination(resPerPage)
    console.log('req.user:::',req.user)
    products = await apiFilters.query.clone()
    
    res.status(200).json({

        resPerPage,
        filteredProductCounts,
        products
    })
})
//create new product => /api/v1/admin/products
export const newProduct = catchAsyncErr ( async (req, res) => {
    const product = await Product.create(req.body)
    // if(!product){
    //     return next(new ErrorHandler('Product Not Found',404))
    // }
    res.status(200).json({
        product,
    })
})
//get product details => /api/v1/products/:id
export const getProductDetails = catchAsyncErr (async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)
    if(!product){
        return next(new ErrorHandler('Product Not Found',404))
    }
    res.status(200).json({
        product,
    })
})
//update product details => /api/v1/products/:id
export const updateProduct = catchAsyncErr ( async (req, res) => {
    let product = await Product.findById(req?.params?.id)
    if(!product){
        return next(new ErrorHandler('Product Not Found',404))

    }
    product = await Product.findByIdAndUpdate(req?.params?.id,req.body,{new:true})
    res.status(200).json({
        product,
    })
})
//delete product details => /api/v1/products/:id
export const deleteProduct = catchAsyncErr ( async (req, res) => {
    let product = await Product.findById(req?.params?.id)
    if(!product){
        return next(new ErrorHandler('Product Not Found',404))

    }
     await product.deleteOne(req?.params?.id,req.body,{new:true})
    res.status(200).json({
        message: "Product deleted!"
    })
})
