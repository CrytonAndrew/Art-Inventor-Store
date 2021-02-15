import express from "express"
import { getProductById, getProducts} from "../controllers/productControllers.js"

const router = express.Router()

router.route("/").get(getProducts) // Using the controller for all the functionality 

router.route("/:id").get(getProductById)

export default router
