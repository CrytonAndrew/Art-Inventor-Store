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

const User = mongoose.model("User", userSchema)

export default User