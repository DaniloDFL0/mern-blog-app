import express from "express"
import { createComment } from "../controllers/commentControllers.js"
import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.post("/create", protectRoute, createComment)

export default router