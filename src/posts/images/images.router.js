import { Router } from "express";
import uploadImage from "./images.handler.js";


const router = Router({ mergeParams: true })

router.post('/', uploadImage)

export default router
