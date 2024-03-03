import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { updateUser } from "../controllers/userControllers.js"

const router = express.Router()

router.put("/update/:id", protectRoute, updateUser)

export default router