import express from "express"
import { googleAuth, signin, signout, signup } from "../controllers/authControllers.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", googleAuth)
router.post("/signout", signout)

export default router