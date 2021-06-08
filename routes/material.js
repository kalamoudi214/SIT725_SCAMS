const express = require('express')
const router = express.Router()

const fs = require('fs')
const multer = require('multer')
const path = require('path')
const materialController = require('../controllers/material')
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  filename: (req, file, cb) => {
    cb(null, +Date.now() + '-' + file.originalname)
  },
})

upload = multer({ storage: storage })
let uploadFields = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'file1', maxCount: 8 },
])
router.post('/', uploadFields, materialController.createMaterial)
router.get('/get/:id', materialController.getFile)
module.exports = router
