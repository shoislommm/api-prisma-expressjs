import prisma from "../../../db.js";

export async function getComments(req, res) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                deleted: false
            }
        })

        return res.status(200).json({
            comments: comments
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

    try {
        const comment = await prisma.comment.create({
            data: {
                text: text,
                authorId: authorId,
                postId: postId
            }
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
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}