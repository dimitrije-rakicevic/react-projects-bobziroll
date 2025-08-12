import { prismaClient as prisma } from '../prisma/client.js'

export const getAllVans = async (req, res) => {
    const vans = await prisma.van.findMany({ 
        include: { host: true },
        include: {
            vanImages: {
                select: { path: true }
            } 
    }})
    res.json(vans)
}

export const getVan = async (req, res) => {
    const { id } = req.params

    try {
        const van = await prisma.van.findUnique({
            where: { id: parseInt(id) },
            include: { 
                vanImages: {
                    select: { path: true}
            }}
        })

        if (!van) {
        return res.status(404).json({ error: 'Van not found' })
        }

        res.json(van)
  } catch (error) {
        console.error('Error getting van:', error)
        res.status(500).json({ error: 'Server error' })
  }
}