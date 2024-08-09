import { Router } from "express";
import addLike from "./likes.handler.js";
import { protect } from "../../middlewares/auth.js";

const router = Router({ mergeParams: true })

router.post('/', protect, addLike)

export default router