import errorHandler from "../utils/error.js"
import Comment from "../models/commentModel.js"

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body

        if(userId !== req.user.userId.toString()) return next(errorHandler(403, "You are not allowed to create a comment."))
        
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        const savedComment = await newComment.save()

        res.status(201).json(savedComment)

    } catch(error) {
        console.log(error)
        next(error)
    }
}