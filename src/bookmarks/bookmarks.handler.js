import prisma from "../../db.js";

export async function getBookmarks(req, res) {
    const userId = req.user.id

    try {
        const userBookmarks = await prisma.user.findUnique({
            where: { id: userId },
            select: { bookmarks: { select: { post: { include: { author: true } } } } }
        })

        const bookmarks = userBookmarks.bookmarks.map((bookmark) => bookmark.post)

        if (bookmarks <= 0) {
            return res.status(200).json({
                message: "Cannot find user bookmarks!"
            })
        }

        return res.status(200).json({
            success: true,
            bookmarks: bookmarks,

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getBookmarkById(req, res) {
    const userId = req.user.id
    const postId = req.params.id

    try {

        const userBookmarks = await prisma.user.findUnique({
            where: { id: userId },
            select: { bookmarks: { select: { post: true } } }
        })

        const isBookmarked = userBookmarks.bookmarks.filter((bookmark) => bookmark.post.id === postId).length > 0

        return res.status(200).json({
            success: true,
            isBookmarked,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export async function addToBookmarks(req, res) {
    const userId = req.user.id
    const postId = req.params.id

    try {
        const bookmark = await prisma.bookmark.findFirst({
            where: {
                userId: userId,
                postId: postId
            }
        })

        if (bookmark) {
            await prisma.bookmark.delete({
                where: {
                    id: bookmark.id
                }
            })

            return res.status(200).json({
                success: true,
                message: 'Removed from bookmarks!'
            })
        }

        await prisma.bookmark.create({
            data: {
                userId: userId,
                postId: postId
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Added to bookmarks!'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}