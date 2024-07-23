import jwt from "jsonwebtoken"

export function protect(req, res, next) {
    const token = req.get('authorization')?.split?.(' ')?.[1]
    console.log(token)

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'token is not defined'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'invalid token'
        })
    }

}