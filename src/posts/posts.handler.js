import prisma from "../../db.js"

export async function getPosts(req, res) {
    let { page, limit } = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    try {
        if (isNaN(page)) {
            page = 1
        }

        if (isNaN(limit)) {
            limit = 5
        }

        const posts = await prisma.post.findMany({
            take: limit,
            skip: limit * (page - 1),
            where: { deleted: false },
            orderBy: { createdAt: 'asc' },
            
            select: {
                id: true,
                title: true,
                content: true,
                author: { select: { username: true } },
                numberOfLikes: true
            },
        })

        const totalCount = await prisma.post.count({
            where: { deleted: false },
            
        })

        const totalPages = Math.ceil(totalCount / limit)
        const hasMorePages = page < totalPages;
        const nextPage = Math.min(totalPages, page + 1)


        return res.status(200).json({
            posts,
            totalCount,
            totalPages,
            hasMorePages,
            nextPage
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET "http://localhost:3000/api/posts?page=1&limit=50"

// -> {posts: [], totalCount: 123123, hasMorePages: true, totalPages: 44, nextPage}

export async function createPost(req, res) {
    const { title, content } = req.body
    req.query
    const authorId = req.user.id

    console.log(authorId)

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
            where: { id: postId, deleted: false },
            select: {
                id: true,
                title: true,
                content: true,
                author: { select: { username: true } },
                numberOfLikes: true
            },
        })

        return res.status(200).json({
             post
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
