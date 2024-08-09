import { Router } from "express"
import { createPost, deletePost, deletePosts, getPostById, getPosts, updatePost } from "./posts.handler.js"
import { protect } from "../middlewares/auth.js"
import commentRouter from "./comments/comments.router.js"
import likeRouter from "./likes/likes.router.js"
import favouriteRouter from './favourites/favourites.router.js';

const router = Router()

router.use('/:id/comments', commentRouter)
router.use('/:id/likes', likeRouter)
router.use('/:id/favourites', favouriteRouter)

router.get('/', getPosts) // get all posts
router.post('/', protect, createPost) // create post
router.get('/:id', getPostById) // get post
router.put('/:id', protect, updatePost) // update post
router.delete('/:id', protect, deletePost) // delete post
router.delete('/', protect, deletePosts)

export default router