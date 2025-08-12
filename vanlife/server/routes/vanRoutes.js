import express from 'express'
import { getAllVans, getVan } from '../controllers/vanController.js'

const router = express.Router()

router.get('/vans', getAllVans)
router.get('/vans/:id', getVan)

export default router