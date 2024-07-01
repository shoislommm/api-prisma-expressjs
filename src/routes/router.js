import { Router } from 'express'
import authRouter from '../auth/auth.router.js'
import postsRouter from '../posts/posts.router.js'

const router = Router()


router.use('/auth', authRouter)
router.use('/posts', postsRouter)

export default router