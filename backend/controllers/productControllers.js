import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   Get /api/products
// @access  public
const getProducts = asyncHandler(async(req, res) => {
    const pageSize = 8 // Number of products per page

    const page = Number(req.query.pageNumber) || 1 // Getting the page 


    // We have to check whether we are going to return all products or searched products
    const keyword = req.query.keyword ? {
        name: {
            $regex : req.query.keyword, // regular expressions for when we type the first words we want that product to appear
            $options: "i" // Case in sensitive
        }
    } : {} // req.query is a way to get query strings such as "?"

    const count  = await Product.countDocuments({...keyword})

    // The spread is either gonna have the keyword or return all products
    // Pagination -> .skip returns the order or products, if its page 2 we want to not return the products from page 1
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1)) 

    // getting products, page, pages 
    res.json({products, page, pages: Math.ceil(count / pageSize)}) 
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
   
    // Create a new product with sample data
    const product = new Product({
        name: "Sample Name",
        price: 0,
        user: req.user._id, // Uses the logged in user
        image: "/images/sample.jpg",
        description: "This is the sample description",
        category: "Sample Category",
        countInStock: 0,
        numReviews: 0,
    })

    const createdProduct = await product.save() // Saving that product to the database
    res.status(201).json(createdProduct) // Sending the new product back
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

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
    else {
        res.status(404)
        throw new Error("Product not found")
    }
})



// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async(req, res) => {
    // Get the data from the body 
    const {
        rating, 
        comment
    } = req.body

    // Find the product to update
    const product = await Product.findById(req.params.id)
    
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error("Product already reviewed")
        }
        const review ={
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        
        res.status(201).json({message: "Product review added"})
    }
    else {
        res.status(404)
        throw new Error("Product not found")
    }
})



// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async(req, res) => {
    // Getting top 3 products in ascending order
    const products = await Product.find({}).sort({rating: -1}).limit(3) 

    res.json(products)
})




// @desc    Get hoodie products
// @route   Get /api/products/hoodies
// @access  public
const getHoodieProducts = asyncHandler(async(req, res) => {
    const pageSize = 4 // Number of products per page

    const page = Number(req.query.pageNumber) || 1 // Getting the page 


    // We have to check whether we are going to return all products or searched products
    const count  = await Product.countDocuments({})

    // The spread is either gonna have the keyword or return all products
    // Pagination -> .skip returns the order or products, if its page 2 we want to not return the products from page 1
    const products = await Product.find({category: "Hoodies"}).limit(pageSize).skip(pageSize * (page - 1)) 

    // getting products, page, pages 
    res.json({products, page, pages: Math.ceil(count / pageSize)}) 
})


// @desc    Get sweater products
// @route   Get /api/products/sweaters
// @access  public
const getSweaterProducts = asyncHandler(async(req, res) => {
    const pageSize = 4 // Number of products per page

    const page = Number(req.query.pageNumber) || 1 // Getting the page 


    // We have to check whether we are going to return all products or searched products
    const count  = await Product.countDocuments({})

    // The spread is either gonna have the keyword or return all products
    // Pagination -> .skip returns the order or products, if its page 2 we want to not return the products from page 1
    const products = await Product.find({category: "Sweaters"}).limit(pageSize).skip(pageSize * (page - 1)) 

    // getting products, page, pages 
    res.json({products, page, pages: Math.ceil(count / pageSize)}) 
})



export {
    getProducts, 
    getProductById, 
    deleteProduct, 
    updateProduct, 
    createProduct, 
    createProductReview, 
    getTopProducts,
    getHoodieProducts,
    getSweaterProducts
}