import { Router } from "express";
import { protect } from "../../middlewares/auth.js";
import addFavourite from "./favourites.handler.js";

const router = Router({ mergeParams: true })

router.post('/', protect, addFavourite)

export default router