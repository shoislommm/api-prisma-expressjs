import prisma from "../../../db.js";

export default async function addFavourite(req, res) {
    const authorId = req.user.id
    const postId = req.params.id

    try {
        const favourite = await prisma.favourite.findFirst({
            where: {
                authorId: authorId,
                postId: postId
            }
        })

        if (favourite) {
            await prisma.favourite.delete({
                where: {
                    id: favourite.id
                }
            })
    
            return res.status(200).json({
                success: false,
                message: 'Removed from favourites!'
            })
        }

        await prisma.favourite.create({
            data: {
                authorId: authorId,
                postId: postId
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Added to favourites!'
        })

    } catch (error) {
        console.error(error)
    }
}