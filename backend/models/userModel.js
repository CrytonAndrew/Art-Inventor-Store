import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true,
})

//  A function to decrpty our password when checking the user
userSchema.methods.matchPassword = async function(enteredPassword) {
    // "await" since it return a promise
    return await bcrypt.compare(enteredPassword, this.password)
}

// Middleware to encrypt our password
// Methods can be set to happen to before or after, even when sending 
// This runs before saving
userSchema.pre('save', async function(next) {
    // Do this only if the password is modified else skip 
    if (!this.isModified('password')) {
        next()
    }

    // encrypt the password
    // this will encrypt our password when we register a new user
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User