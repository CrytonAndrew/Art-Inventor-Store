import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"



// @desc    Auth user & get token 
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async(req, res) => {
    // Get body data from the form when they sign up or register 
    const {email, password} = req.body

    // Check the user using their email
    const user = await User.findOne({email: email})

    // "await" since it returns a promise
    // Plus by using the function from the model to check if the passwords match 
    // makes the code a whole lot cleaner
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401) // Invalid access error
        throw new Error("Invlid email or password") // We can catch this error in our frontend
    }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async(req, res) => {
    // Get currently logged in user details -> These details are due to the authorization takes place
    // The was first assigned a token, the token is then used to authorize the user for accessing private routes
    const user = await User.findById(req.user._id)

    // Sending back the information of the currently logged in user
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export { authUser, getUserProfile }
