import express from "express"
import dotenv from "dotenv"
import products from "./data/products.js"

dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.send("API up and running")
})

//Get all products
app.get("/api/products", (req, res) => {
    res.json(products) // Or res.send(products)
})

// Get one product
app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => String(p._id) === req.params.id)
    res.json(product)
})


const PORT = process.env.PORT

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))