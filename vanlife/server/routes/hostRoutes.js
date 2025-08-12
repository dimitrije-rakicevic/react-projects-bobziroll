import express from 'express'
import {
    getHostVans,
    createVan,
    updateVan,
    deleteVan,
    getReviews,
    getIncome
} from '../controllers/hostController.js'

import { upload } from '../middleware/upload.js'

import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/vans', requireAuth ,getHostVans)
router.put('/vans/:id', requireAuth, updateVan)
router.delete('/vans/:id', requireAuth, deleteVan)
router.get('/reviews', requireAuth ,getReviews)
router.get('/income', requireAuth ,getIncome)
router.post('/vans', requireAuth, upload.array("images", 5), createVan)

export default router