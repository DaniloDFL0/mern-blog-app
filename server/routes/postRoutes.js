import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { createPost, deletePost, getPosts, updatePost } from "../controllers/postControllers.js"

const router  = express.Router()

router.get("/getposts", getPosts)
router.post("/create", protectRoute, createPost)
router.delete("/delete/:postId/:userId", protectRoute, deletePost)
router.put("/update/:postId/:userId", protectRoute, updatePost)

export default router