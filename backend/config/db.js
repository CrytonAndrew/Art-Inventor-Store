import mongoose from "mongoose"

// MongoDB returns a promise and for that we use async await 
const connectDB = async () => {
    try {
        // We also add these options for the current version of mongoose
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true, 
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1) // Exit with failure
    }
}

export default connectDB