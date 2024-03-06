import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { deleteUser, getUsers, updateUser } from "../controllers/userControllers.js"

const router = express.Router()

router.get("/getusers", protectRoute, getUsers)
router.put("/update/:id", protectRoute, updateUser)
router.delete("/delete/:id", protectRoute, deleteUser)

export default router