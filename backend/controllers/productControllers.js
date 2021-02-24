import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   Get /api/products
// @access  public
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products) 
})


// @desc    Fetch single product
// @route   Get /api/products
// @access  public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error("Product not found") // This is gonna go through our error handler
    }   
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        // All admins can delete products
        // If i wanted admins who created the product to be the ones who delete the product
        // I would add a check here
        // if (req.user._id === product.user._id)
        await product.delete()
        res.json({message: "Product successfully deleted"})
    }
    else {
        res.status(404)
        throw new Error("Product not found") // This is gonna go through our error handler
    }   
})



// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async(req, res) => {
   
    // Load product with sample data 
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        description: "This is the sample description",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
    })

    const createdProduct = await product.save()
    res.status(201)
    res.json(createdProduct)
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async(req, res) => {
    // Get the data from the body 
    const {
        name, 
        price, 
        description, 
        image, 
        category,
        countInStock,
    } = req.body

    // Find the product to update
    const product = await Product.findById(req.params.id)
    
    if (product) {
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = product.save()
        res.json(updatedProduct)
    }
    else {
        res.status(404)
        throw new Error("Product not found")
    }
})




export {getProducts, getProductById, deleteProduct, updateProduct, createProduct}