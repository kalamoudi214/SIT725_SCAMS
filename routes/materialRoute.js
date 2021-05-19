const express = require('express')
const router = express.Router()

const fs = require('fs')
const multer = require('multer') // multer is a npm package to upload file - server directory
const path = require('path')

//  // To call (create or get) Materialfunction on controllers/material
const materialController = require('../controllers/material')

// multer.storage is a function to decide a destination directory where all material files will save and with what name.
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  filename: (req, file, cb) => {
    cb(null, +Date.now() + '-' + file.originalname)
  },
})
// here we are using the above storage variable to use in controller
upload = multer({ storage: storage })

router.post('/create', upload.single('file'), materialController.createMaterial)
router.get('/get/:id', materialController.getFile)
module.exports = router
