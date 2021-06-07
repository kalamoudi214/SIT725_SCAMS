const { render } = require('ejs')
const { findOneAndUpdate } = require('../models/user')
const userModel = require('../models/user')

///// this function is used to create user in database
const createUser = async (req, res) => {
  try {
    let data = req.body
    if (data.userName) {
      let users = await userModel.find().lean()
      let check = users.find((element) => element.email === data.email)
      if (!check) {
        let result = await userModel.create({ ...data })

        res.redirect('/')
      } else {
        res.status(400).json({ message: 'Email already exist' })
      }
    } else {
      let result = await userModel.findOneAndUpdate(
        { email: data.email },
        { role: data.role },
        { new: true },
      )
      let users = await userModel.find()
      res.render('users.ejs', {
        data: { user: users, success: 'User Role updated successfully' },
      })
    }
  } catch (e) {
    console.log(e)
    if (req.body.userName) {
      res.json({ error: 'There is an error while creating user' })
    } else {
      let users = await userModel.find()
      res.render('users.ejs', {
        data: { user: users, error: 'Failed to update user role' },
      })
      res.render
    }
  }
}

const loginUser = async (req, res) => {
  let result = await userModel.findOne({ email: req.body.email }).lean()
  if (result && Object.keys(result).length) {
    if (req.body.password == result.password) {
      //res.redirect('/dashboard')
      res.render('login.ejs', {
        data: {
          success: 'login successfully',
          id: result._id,
          role: result.role,
        },
      })
    } else {
      res.render('login.ejs', { data: { error: 'incorrect password' } })
    }
  } else {
    res.render('login.ejs', { data: { error: 'incorrect Email' } })
  }
}

const updateRole = async (req, res) => {
  console.log(req.body)
}

const getUserVeiw = async (req, res) => {
      let users = await userModel.find().lean()
      res.render('users.ejs', { data: { user: users } })
}


module.exports = {
  createUser,
  loginUser,
  updateRole,
  getUserVeiw,
}
