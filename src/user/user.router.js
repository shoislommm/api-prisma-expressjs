import { Router } from "express";
import { getUser, getUserPosts } from "./user.handler.js";
import { protect } from "../middlewares/auth.js";

const router = Router()

router.get('/', protect, getUser)
router.get("/posts", protect, getUserPosts)

export default router