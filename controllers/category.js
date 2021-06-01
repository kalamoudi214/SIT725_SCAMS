const categoryModel = require('../models/category')
const socket = require('../server')

//// this function is used to create catregory in database
const createCategory = async (req, res) => {
  try {
    let data = req.body
    let initialCategory = await categoryModel.find()
    let check = initialCategory.find((element) => element.name === data.name)
    if (!check) {
      let result = await categoryModel.create({ ...data })
      //res.status(200).json({data: result })
      let cat = await categoryModel.find().lean()
      let a = await socket.sockets.emit('message', { type: 'material' })
      res.render('category.ejs', {
        data: { success: 'Category Created Successfully', category: cat },
      })
    } else {
 //res.status(400).json({message: 'Category already exist' })
      res.render('category.ejs', {
        data: { error: 'Category already exist', category: initialCategory },
      })
    }
  } catch (e) {
    console.log(e)
    res.json({ error: 'There is an error while creating category' })
  }
}

// return category page with all category

const getViewCategory = async(req,res) => {
  let cat = await categoryModel.find().lean()
  res.render("category.ejs", { data: { category: cat }})
}

module.exports = {
  createCategory,
  getViewCategory,
}
