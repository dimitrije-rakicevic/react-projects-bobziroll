import { prismaClient as prisma } from '../prisma/client.js'
import path from 'path'
import fs from 'fs/promises'
import { resolveSoa } from 'dns'
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
    const { name, price, description, type } = req.body
    const van = await prisma.van.create({
      data: { 
        name, 
        price: parseInt(price), 
        description, 
        imageUrl: req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null , 
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
  try {
    const { name, price, description, type } = req.body
    const { id } = req.params
    console.log('1st', req.body.deleteImagesIds)
    let deleteImagesIds = req.body.deleteImagesIds || [];
    
    console.log('2nd', deleteImagesIds)

    // Ako je samo jedan id došao, biće string
    if (!Array.isArray(deleteImagesIds)) {
      deleteImagesIds = [deleteImagesIds];
    }

    deleteImagesIds = deleteImagesIds.map(id => Number(id))

    console.log('after map', deleteImagesIds)

    await prisma.van.update({
      where: { id: Number(id) },
      data: {
        name,
        price: Number(price),
        description,
        type
      }
    })

    const images = req.files.map(file => ({
      path: `/uploads/${file.filename}`,
      vanId: Number(id)
    }))

    await prisma.image.createMany({
      data: images
    })

    const imagesToDelete = await prisma.image.findMany({
      where: {id : { in: deleteImagesIds } }
    })

    await prisma.image.deleteMany({
      where: { id: { in: deleteImagesIds } }
    })

    
    console.log(imagesToDelete)

    imagesToDelete.forEach(async (img) => {
      try {
        await fs.unlink(path.join(img.path).slice(1))
      } catch (error) {
        console.warn(`⚠️ Slika nije pronađena: ${img.path}`)
      }
    })

    res.status(200).json({ message: "Van updated successfully" })
  } catch(error) {
    res.status(500).json({ error: 'Internal server error' })
    console.log(error)
  }
}

export const deleteVan = async (req, res) => {
  try {
    const { id } = req.params

    const images = await prisma.image.findMany({
      where: { vanId: Number(id) },
    });

    console.log(images.map(img => img.path))

    images.forEach(async (img) => {
      try {
        await fs.unlink(path.join(img.path).slice(1))
      } catch (error) {
        console.warn(`⚠️ Slika nije pronađena: ${img.path}`)
      }
    })

    await prisma.van.delete({ where: { id: +id } })
    res.json({ message: 'Deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to delete van" })
  }
}

export const getReviews = async (req, res) => {
  
}

export const getIncome = async (req, res) => {

}