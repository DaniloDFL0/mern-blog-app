import jwt from "jsonwebtoken"
import errorHandler from "../utils/error.js"

const protectRoute = async (req, res, next) => {
    const token = req.cookies.token
    if(!token) return next(errorHandler(401, "Unauthorized"))

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
}

export default protectRoute
