import Post from "../models/postModel.js"
import errorHandler from "../utils/error.js"

export const createPost = async (req, res, next) => {
    try {
        
        if(!req.user.isAdmin) return next(errorHandler(403, "User is not allowed to create a post."))

        if(!req.body.title || !req.body.content) return next(errorHandler(400, "Title and desc of post are required."))

        const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "-")

        const newPost = new Post({
            ...req.body,
            slug,
            userId: req.user.userId
        })
        const savedPost = await newPost.save()
        
        res.status(201).json(savedPost)
        
    } catch(error) {
        console.log(error)
        next(error)
    }
}