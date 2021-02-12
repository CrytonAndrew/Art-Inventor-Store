import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"


dotenv.config()

connectDB()

// Imports data into the database
// Async since mongoose returns a promise
const importData = async () => {
    try {
        // Clear database first 
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()


        // We want to add the admin user for every product - since in our model we specified a user for product
        //
        // get all users
        const createdUsers = await User.insertMany(users)

        // Fetch the first users id -> which is the admin user
        const adminUser = createdUsers[0]._id

        // Use a spread operator to attach a user to every product
        // Return all the products with the admin user
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log("Data imported".green.inverse)

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


const destroyData = async() => {
    try {
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()
        console.log("Successfully delete all data from database".green.inverse)
    } catch (error) {
        console.log(`${error}`.red.inverse)
    }
}

// The following are the scripts to populate or delete sample data from our database
// "data:import": "node backend/seeder",
// "data:destroy": "node backend/seeder -d",

if (process.argv[2] === "-d") {
    destroyData()
}
else {
    importData()
}
