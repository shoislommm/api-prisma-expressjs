import prisma from "../../db.js"

export async function getPosts(req, res) {
    try {
        const posts = await prisma.post.findMany({
            where: { deleted: false },
            include: {
                comments: true,
                likes: true,
            }
            
        })

        return res.status(200).json({
            posts: posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function createPost(req, res) {
    const { title, content } = req.body
    const authorId = req.user.id

    try {
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: authorId
            }
        })

        return res.status(200).json({
            post: post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getPostById(req, res) {
    const postId = req.params.id

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId, deleted: false }
        })

        return res.status(200).json({
            post: post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function updatePost(req, res) {
    const postId = req.params.id
    const authorId = req.user.id
    const { title, content } = req.body

    try {
        const post = await prisma.post.update({
            where: { id: postId, authorId: authorId },
            data: {
                title: title,
                content: content
            }
        })

        return res.status(200).json({
            post: post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function deletePost(req, res) {
    const postId = req.params.id
    const authorId = req.user.id

    try {
        const post = await prisma.post.update({
            where: { id: postId, authorId: authorId },
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

export async function deletePosts(req, res) {
    const authorId = req.user.id

    try {
        const posts = await prisma.post.updateMany({
            where: { authorId: authorId },
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
