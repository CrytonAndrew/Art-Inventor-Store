import express from "express"
import { 
    getProductById, 
    getProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts,
    getHoodieProducts,
    getSweaterProducts
} from "../controllers/productControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router()

// Using the controller for all the functionality 
router.route("/")
    .get(getProducts) 
    .post(protect, admin, createProduct)

router.get("/top", getTopProducts)

router.get("/hoodie", getHoodieProducts)

router.get("/sweater", getSweaterProducts)

router.route("/:id")
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

router.route("/:id/reviews").post(protect, createProductReview)
    

export default router
