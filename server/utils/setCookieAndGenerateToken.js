import jwt from "jsonwebtoken"

const setCookieAndGenerateToken = (userId, res, next) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })
        
    } catch(error) {
        console.log(error)
        next(error)
    }
}

export default setCookieAndGenerateToken