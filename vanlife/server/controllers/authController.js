import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prismaClient as prisma } from '../prisma/client.js'

const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req, res) => {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10)
    try {
        const user = await prisma.user.create({
            data: { email, password: hash, name }
        })
        res.status(201).json({ message: 'You have successfuly registered.' })
    } catch (err) {
        console.error("Error during registration.", err);

        if(err.code === "P2002" && err.meta?.target?.includes('email'))
        {
            return res.status(400).json({ error: 'Account with this email already exists.'})
        }

        res.status(500).json({ error: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ where: { email }})
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials.' })
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' })
        res.json({ token }) 
    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json('Internal server error.')
    }
}