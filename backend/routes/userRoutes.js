import express from "express"
import { 
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

// Register new user
router.route("/").post(registerUser)

// Get all users
router.route("/").get(protect, admin, getUsers)

// Remove user
router.route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

// Login 
router.route("/login").post(authUser)

// Get user info, Update user profile
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router