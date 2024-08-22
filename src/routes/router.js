import { Router } from 'express'
import authRouter from '../auth/auth.router.js'
import postsRouter from '../posts/posts.router.js'
import userRouter from '../user/user.router.js'
import bookmarkRouter from '../bookmarks/bookmarks.router.js'

const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/posts', postsRouter)
router.use('/bookmarks', bookmarkRouter)

export default router