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

// @desc    Register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async(req, res) => {
    // Get body data from the form when they sign up or register 
    const {name, email, password} = req.body

    // Check if user exists
    const userExists = await User.findOne({email: email})

    if (userExists) {
        res.status(400) // Bad request
        throw new Error("User already exists")
    } 

    const user = await User.create({
        name, 
        email, 
        password,
    })

    if (user) {
        res.status(201) // something was created
        
        // We want to be able to authenticate -> once the user registers
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(404)
        throw new Error("Invalid user data")
    }
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    // Get currently logged in user details -> These details are due to the authorization takes place
    // The was first assigned a token, the token is then used to authorize the user for accessing private routes
    const user = await User.findById(req.user._id)

    // Sending back the information of the currently logged in user
    if (user) {
        user.name = req.body.name  || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password  // Automatically encrpted in the model
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    // get the user
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({message: "User removed"})
    }
    else {
        res.status(404)
        throw new Error("User not found")
    }
})


export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser}
