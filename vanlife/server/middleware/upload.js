import multer from 'multer'
import path from 'path'
import fs from 'fs'

// napravi folder ako ne postoji
const uploadPath = 'uploads'
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, uniqueName)
  },
})

export const upload = multer({ storage })