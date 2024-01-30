import Product from "../models/product.js"
export const getProducts = async (req, res) => {
    res.status(200).json({
        message: "All products"
    })
}
//create new product => /api/v1/admin/products
export const newProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        product,
    })
}