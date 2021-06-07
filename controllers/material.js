const url = require('url')
const path = require('path')
const materialModel = require('../models/material')
const categoryModel = require('../models/category')
const socket = require('../server')

//// this function is used to create send file from database
const getFile = async (req, res) => {
  const np = path.join(__dirname + '/../uploads')

  res.sendFile(np + '/' + req.params.id)
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
        req.file.filename,
      file_path: req.file.path,
    }

    let result = await materialModel.create({ ...obj })
    let cat = await categoryModel.find().lean()
    let mat = await materialModel.find().lean()
    // this line is use to send notification
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

//return material page with all material and category

const getMaterialView = async (req, res) => {
  let cat = await categoryModel.find().lean()
  let mat = await materialModel.find().lean()
  res.render('material.ejs', {data: { category: cat, material: mat },
  })


}

module.exports = { createMaterial, getFile , getMaterialView}
