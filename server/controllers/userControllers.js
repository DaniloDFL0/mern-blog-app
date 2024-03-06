import User from "../models/userModel.js"
import errorHandler from "../utils/error.js"
import bcrypt from "bcryptjs"

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params

        if(id !== req.user.userId.toString()) return next(errorHandler(403, "Not allowed to update this user."))
        
        if(req.body.password) {
            if(req.body.password.length < 6) return next(errorHandler(400, "Password must be at least 6 characters."))

            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        if(req.body.username.includes(" ")) return next(errorHandler(400, "Username cannot contain spaces."))

        const updatedUser = await User.findByIdAndUpdate(id, { $set: { 
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture
        } }, { new: true })
        const { password, ...rest } = updatedUser._doc

        res.status(200).json(rest)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params

        if(!req.user.isAdmin && id !== req.user.userId.toString()) return next(errorHandler(403, "You are not allowed to delete other user's accounts."))

        const user = await User.findById(id)
        if(!user) return next(errorHandler(404, "User not found."))

        await User.findByIdAndDelete(id)

        res.status(200).json({ msg: "User is deleted successfully." })
        
    } catch(error) {
        console.log(error)
        next(error)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        if(!req.user.isAdmin) return next(errorHandler(403, "You are not allowed to see all users."))
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.sort === "asc" ? 1 : -1

        const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit).select("-password")
        
        const totalUsers = await User.countDocuments()

        const now = new Date()

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo}
        })

        res.status(200).json({
            users,
            totalUsers,
            lastMonthUsers
        })

    } catch(error) {
        console.log(error)
        next(error)
    }
}