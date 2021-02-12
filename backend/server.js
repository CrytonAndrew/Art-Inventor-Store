import express from "express"
import products from "./data/products.js"

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
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

app.listen(5000, console.log("Server running on port 5000"))