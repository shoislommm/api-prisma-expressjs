import { Router } from "express";
import { getUser } from "./user.handler.js";
import { protect } from "../middlewares/auth.js";

const router = Router()

router.get('/', protect, getUser)

export default router