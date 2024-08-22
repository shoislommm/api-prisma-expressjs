import { Router } from "express"
import { createPost, deletePost, deletePosts, getPostById, getPosts, updatePost } from "./posts.handler.js"
import { protect } from "../middlewares/auth.js"
import multer from "../middlewares/multer.js"
import commentRouter from "./comments/comments.router.js"
import likeRouter from "./likes/likes.router.js"
import imagesRouter from "./images/images.router.js"

const router = Router()

router.use('/:id/comments', commentRouter)
router.use('/:id/likes', protect, likeRouter)
router.use('/images', protect, multer("uploads/images/").single("image"), imagesRouter)

router.get('/', getPosts) // get all posts
router.post('/', protect, multer("uploads/banners/").single('banner'), createPost) // create post
router.get('/:id', getPostById) // get post
router.put('/:id', protect, multer("uploads/banners/").single('banner'), updatePost) // update post
router.delete('/:id', protect, deletePost) // delete post
router.delete('/', protect, deletePosts)

export default router