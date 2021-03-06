import jwt, { decode } from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// Validates the token 
const protect = asyncHandler(async(req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Decode the token
        try {
            token = req.headers.authorization.split(' ')[1]

            // 'decode' contains the user id that can be used to get the user
            const decoded = jwt.verify(token, process.env.JWT_SECRET) 

            // 'req.user' now contains the user 
            // This user will now have access to all of the protected routes
            req.user = await User.findById(decoded.id).select("-password")


            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized token failed")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorized no token")
    }
   
})

const admin = asyncHandler(async(req, res, next) => {
    if (req.user && req.user.isAdmin) { // If user is admin we continue
        next()
    }
    else {
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
})

export { protect, admin }
