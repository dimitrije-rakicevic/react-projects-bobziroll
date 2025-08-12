import { prismaClient as prisma } from '../prisma/client.js'

export const getHostVans = async (req, res) => {
  const vans = await prisma.van.findMany({ 
    where: { hostId: req.userId },
    include: {
      vanImages: {
        select: { path: true }
      } 
    }
  })
  res.json(vans)
}

export const createVan = async (req, res) => {
  try {
    console.log(req.userId)
    console.log(req.images)
    const { name, price, description, type } = req.body
    const van = await prisma.van.create({
      data: { 
        name, 
        price: parseInt(price), 
        description, 
        imageUrl: req.files.length > 0 ? `/uploads/${req.files[0].filename}` : 'noimage', 
        type, 
        host: {
          connect: { id: req.userId } // umesto hostId direktno
        }
      }
    })

    const images = req.files.map(file => ({
      path: `/uploads/${file.filename}`,
      vanId: van.id
    }))

    await prisma.image.createMany({
      data: images,
    })

    res.status(201).json(van)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create van" })
  }
}

export const updateVan = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const van = await prisma.van.update({
    where: { id: +id },
    data
  })
  res.json(van)
}

export const deleteVan = async (req, res) => {
  const { id } = req.params
  await prisma.van.delete({ where: { id: +id } })
  res.json({ message: 'Deleted' })
}

export const getReviews = async (req, res) => {
  
}

export const getIncome = async (req, res) => {

}