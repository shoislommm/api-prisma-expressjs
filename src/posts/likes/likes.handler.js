import prisma from "../../../db.js";

export default async function createLike(req, res) {
    const authorId = req.user.id
    const postId = req.params.id


    try {
        const like = await prisma.like.findFirst({
            where: {
                authorId: authorId,
                postId: postId
            }
        })

        if (!like) {
            const like = await prisma.like.create({
                data: {
                    authorId: authorId,
                    postId: postId
                }
            })

            const increment = await prisma.post.update({
                where: { id: postId },
                data: {
                    numberOfLikes: { increment: 1 }
                }
            })

            return res.status(200).json({
            
                message: 'liked'
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

        return res.status(200).json({
            message: 'unliked'
        })

    } catch (error) {
        console.error(error)
    }
}