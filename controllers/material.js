const url = require('url')
const path = require('path')
const material = require('../models/material')
const category = require('../models/category')
const socket = require('../server')

//// this function is used to create send file from database
const getFile = async (req, res) => {
  try {
    const np = path.join(__dirname + '/../uploads')

    res.sendFile(np + '/' + req.params.id)
  } catch (e) {
    res.json({ error: "image doesn't found" })
  }
}

//// this function is used to create material in database
const createMaterial = async (req, res) => {
  console.log('req', req.body)
  // console.log('req.file', req.file);
  try {
    let obj = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      file_url:
        url.format({
          protocol: req.protocol,
          host: req.get('host'),
        }) +
        '/material/get/' +
        req.files.file[0].filename,
      file_path: req.files.file[0].path,

      thumbnail_url:
        url.format({
          protocol: req.protocol,
          host: req.get('host'),
        }) +
        '/material/get/' +
        req.files.file1[0].filename,
      thumbnail_path: req.files.file1[0].path,
    }

    let result = await material.create({ ...obj })
    let cat = await category.find().lean()
    let mat = await material.find().lean()
    let a = await socket.sockets.emit('message', { type: 'material' })
    res.render('material.ejs', {
      data: {
        success: 'Material Uploaded Successfully',
        category: cat,
        material: mat,
      },
    })
  } catch (e) {
    console.log(e)
    res.json({ error: 'There is an error while creating material' })
  }
}

module.exports = { createMaterial, getFile }
