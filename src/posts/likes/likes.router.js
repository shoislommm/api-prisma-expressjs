import { Router } from "express";
import { addLike, getLikeById } from "./likes.handler.js";

const router = Router({ mergeParams: true })

router.get('/', getLikeById)
router.post('/', addLike)

export default router