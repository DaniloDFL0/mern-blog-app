import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { createPost, getPosts } from "../controllers/postControllers.js"

const router  = express.Router()

router.get("/getposts", getPosts)
router.post("/create", protectRoute, createPost)

export default router