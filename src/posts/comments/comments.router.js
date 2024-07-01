import { Router } from "express";
import { createComment, deleteComment, getCommentById, getComments, updateComment } from "./comments.handler.js";
import { protect } from "../../middlewares/auth.js";

const router = Router({mergeParams: true})

router.get('/', getComments)
router.post('/', protect, createComment)
router.get('/:commentId', getCommentById)
router.put('/:commentId', protect, updateComment)
router.delete('/:commentId', protect, deleteComment)

export default router