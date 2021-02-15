import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"



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
            token: null
        })
    } else {
        res.status(401) // Invalid access error
        throw new Error("Invlid email or password") // We can catch this error in our frontend
    }
})

export {authUser}
