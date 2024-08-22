import prisma from "../../db.js"

export async function getUser(req, res) {
    const user = req.user

    try {

        return res.status(201).json({
            user: user,
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export async function getUserPosts(req, res) {
    const user = req.user

    try {
        const posts = await prisma.post.findMany({
            where: { authorId: user.id },
            select: {
                id: true,
                title: true,
                banner: true,
                description: true,
                author: { select: { username: true } },
                numberOfLikes: true
            },
        })

        return res.status(200).json({
            success: true,
            posts: posts
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}