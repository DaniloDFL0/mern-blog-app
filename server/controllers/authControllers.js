import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import errorHandler from "../utils/error.js"
import setCookieAndGenerateToken from "../utils/setCookieAndGenerateToken.js"

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

        setCookieAndGenerateToken(savedUser._id, res)

        const { password: pass, ...rest } = savedUser._doc

        res.status(201).json(rest)
        
    } catch(error) {
        console.log(error)
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect) return next(errorHandler(400, "Username or password is incorrect"))

        setCookieAndGenerateToken(user._id, res)

        const { password: pass , ...rest } = user._doc

        res.status(200).json(rest)
        
    } catch(error) {
        console.log(error)
        next(error)
    }
}