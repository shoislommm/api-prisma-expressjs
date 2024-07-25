import { Router } from 'express'
import authRouter from '../auth/auth.router.js'
import postsRouter from '../posts/posts.router.js'
import userRouter from '../user/user.router.js'

const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/posts', postsRouter)

export default router