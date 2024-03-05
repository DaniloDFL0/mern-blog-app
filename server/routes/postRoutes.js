import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { createPost } from "../controllers/postControllers.js"

const router  = express.Router()

router.post("/create", protectRoute, createPost)

export default router