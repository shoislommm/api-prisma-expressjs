import prisma from "../../../db.js";

export async function getLikeById(req, res) {
    const userId = req.user.id
    const postId = req.params.id

    try {
        const userLikedPosts = await prisma.user.findUnique({
            where: { id: userId },
            select: { likes: { select: { post: true } } }
        })

        const isLiked = userLikedPosts.likes.filter((likedPost) => likedPost.post.id === postId).length > 0

        return res.status(200).json({
            success: true,
            isLiked
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function addLike(req, res) {
    const userId = req.user.id
    const postId = req.params.id


    try {
        const like = await prisma.like.findFirst({
            where: {
                userId: userId,
                postId: postId
            }
        })

        if (!like) {
            const like = await prisma.like.create({
                data: {
                    userId: userId,
                    postId: postId
                }
            })

            const increment = await prisma.post.update({
                where: { id: postId },
                data: {
                    numberOfLikes: { increment: 1 }
                }
            })

            const isLiked = true

            return res.status(200).json({
                success: true,
                isLiked,
                message: 'Liked!'
            })
        }

        const unlike = await prisma.like.delete({
            where: {
                id: like.id
            }
        })

        const decrement = await prisma.post.update({
            where: { id: postId },
            data: {
                numberOfLikes: { decrement: 1 }
            }
        })

        const isLiked = false

        return res.status(200).json({
            success: true,
            isLiked,
            message: 'Unliked!'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}