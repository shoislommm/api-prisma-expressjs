import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { addToBookmarks, getBookmarkById, getBookmarks } from "./bookmarks.handler.js";

const router = Router()

router.get('/', protect, getBookmarks)
router.post('/:id', protect, addToBookmarks)
router.get('/:id', protect, getBookmarkById)

export default router