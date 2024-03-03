import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const app = express()
app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cookieParser())

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({ success: false, statusCode, message })
})

connectToMongoDB()
const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))