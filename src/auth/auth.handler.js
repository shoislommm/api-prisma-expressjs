import prisma from "../../db.js";
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

export async function register(req, res) {
    const { username, password } = req.body;

    try {

        if (!username?.trim?.() || !password?.trim?.()) {
            return res.status(400).json({
                success: false,
                message: 'Please write username and password.'
            });
        }

        const user = await prisma.user.findUnique({
            where: { username: username },
            select: { id: true }
        })

        if (user) {
            return res.status(409).json({
                success: false,
                message: 'Username has already been taken.'
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
                message: 'Incorrect username or password. Please try again.'
            });
        }

        const user = await prisma.user.findUnique({
            where: { username: username },
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect username or password. Please try again.'
            })
        }

        const isMatch = await argon2.verify(user.password, password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect username or password. Please try again.'
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

export async function changePassword(req, res) {
    const { username, password, newPassword } = req.body;

    try {

        if (!username?.trim?.() || !password?.trim?.()) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect username or password. Please try again.'
            });
        }

        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect username or password. Please try again.'
            })
        }

        const newPassword = await prisma.user.update({
            where: { username: username, password: password },
            data: {
                password: newPassword
            }
        })

        return res.status(200).json({
            success: true,
            message: "Password updated!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}