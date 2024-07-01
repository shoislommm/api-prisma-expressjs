import { Router } from "express";
import createLike from "./likes.handler.js";
import { protect } from "../../middlewares/auth.js";

const router = Router({ mergeParams: true })

router.post('/', protect, createLike)

export default router