import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { deleteUser, updateUser } from "../controllers/userControllers.js"

const router = express.Router()

router.put("/update/:id", protectRoute, updateUser)
router.delete("/delete/:id", protectRoute, deleteUser)

export default router