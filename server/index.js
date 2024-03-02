import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const app = express()
app.use(express.json({ limit: "30mb" }))

// ROUTES
app.use("/api/auth", authRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({ success: false, statusCode, message })
})

connectToMongoDB()
const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))