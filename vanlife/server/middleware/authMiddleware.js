import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export const requireAuth = (req, res, next) => {
    const auth = req.headers.authorization
    if(!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' })
    }
    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch(err) {
        res.status(401).json({ error: "Invalid token." })
    }
}