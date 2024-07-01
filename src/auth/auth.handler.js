import prisma from "../../db.js";
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export async function register(req, res) {
    const { username, password } = req.body;

    try {
        if (!username?.trim?.() || !password?.trim?.()) {
            return res.status(400).json({
                success: false,
                message: 'not enough data'
            });
        }

        const user = await prisma.user.findUnique({
            where: { username: username },
            select: { id: true }
        })

        if (user) {
            return res.status(409).json({
                success: false,
                message: 'user already exist'
            })
        }

        const hash = await argon2.hash(password)

        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hash
            }
        })

        return res.status(201).json({
            success: true,
            userId: newUser.id
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function login(req, res) {
    const { username, password } = req.body;
    try {

        if (!username?.trim?.() || !password?.trim?.()) {
            return res.status(401).json({
                success: false,
                message: 'invalid body'
            });
        }

        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'user not found'
            })
        }

        const isMatch = await argon2.verify(user.password, password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'incorrect password'
            })
        }

        const jwtToken = jwt.sign({
            id: user.id,
            name: username
        },
            process.env.JWT_SECRET
        )

        res.json({ jwtToken })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}