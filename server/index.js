import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongoDB.js"

dotenv.config()
const app = express()

connectToMongoDB()
const PORT = process.env.PORT || 6001
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))