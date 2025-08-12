import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import vanRoutes from './routes/vanRoutes.js'
import hostRoutes from './routes/hostRoutes.js' 
import path from 'path'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api', vanRoutes)
app.use('/api/host', hostRoutes)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
})
