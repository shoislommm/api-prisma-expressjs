import { Router } from "express";
import { changePassword, login, register } from "./auth.handler.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.put('/changePassword', changePassword)


export default router