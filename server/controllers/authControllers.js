import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import errorHandler from "../utils/error.js"

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        if(!username || !email || !password) return next(errorHandler(400, "Please fill all fields."))

        const user = await User.findOne({ $or: [ { username }, { email }] })
        if(user) return next(errorHandler(400, "User already exists."))

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        const savedUser = await newUser.save()

        res.status(201).json(savedUser)
        
    } catch(error) {
        console.log(error)
        next(error)
    }
}