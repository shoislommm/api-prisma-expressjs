import prisma from "../../../db.js";

export async function getComments(req, res) {
    let { cursor, limit } = req.query
    const postId = req.params.id
    limit = parseInt(limit)

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        if (!post) {
            return res.status(400).json({
                success: false,
                message: 'invalid post'
            })
        }

        if (isNaN(limit)) {
            limit = 50
        }

        const allComments = await prisma.comment.count({
            where: {
                postId: postId,
                deleted: false
            },
        })

        if (!cursor) {
            const comments = await prisma.comment.findMany({
                take: limit,
                where: {
                    postId: postId,
                    deleted: false
                },
                select: {
                    id: true,
                    text: true,
                    author: { select: { username: true } }
                },
                orderBy: { createdAt: 'asc' }
            })

            const nextCursor = comments.length < limit ? null : comments[comments.length - 1].id
            const totalCount = allComments


            return res.status(200).json({
                comments,
                totalCount,
                nextCursor
            })
        }

        const comments = await prisma.comment.findMany({
            take: limit,
            skip: 1,
            cursor: {
                id: cursor
            },
            where: {
                postId: postId,
                deleted: false
            },
            select: {
                id: true,
                author: { select: { username: true } },
                text: true
            },
            orderBy: { createdAt: 'asc' }
        });

        const nextCursor = comments.length < limit ? null : comments[comments.length - 1].id
        const totalCount = allComments 

        return res.status(200).json({
            comments,
            totalCount,
            nextCursor
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function createComment(req, res) {
    const { text } = req.body
    const authorId = req.user.id
    const postId = req.params.id
    console.log(req.body)

    try {
        const comment = await prisma.comment.create({
            data: {
                text: text,
                authorId: authorId,
                postId: postId
            },
            select: {
                id: true,
                text: true,
                author: { select: { username: true } }
            },
        })

        return res.status(200).json({
            comment: comment
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getCommentById(req, res) {
    const commentId = req.params.commentId

    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId,
                deleted: false
            }
        })

        return res.status(200).json({
            comment: comment
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function updateComment(req, res) {
    const commentId = req.params.commentId
    const authorId = req.user.id
    const text = req.body.text

    try {
        const comment = await prisma.comment.update({
            where: {
                id: commentId,
                authorId: authorId
            },
            data: { text: text }
        })

        return res.status(200).json({
            comment: comment
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function deleteComment(req, res) {
    const commentId = req.params.commentId
    const authorId = req.user.id

    try {
        const comment = await prisma.comment.update({
            where: {
                id: commentId,
                authorId: authorId
            },
            data: { deleted: true }
        })

        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}