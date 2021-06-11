// importing express library
const express = require('express')
// use express module to create rest5 API's
const app = express()
const path = require('path')
// using cores for cross origin request
const cors = require('cors')
// use body parser to convet request into json
const bodyParser = require('body-parser')
//importing the routers
const userRoute = require('./routes/userRouter')
const categoryRoute = require('./routes/categoryRouter')
const departmentRoute = require('./routes/departmentRouter')
const materialRouter = require('./routes/material')
const departmentModel = require('./models/department')
const quizRoute = require('./routes/quizRouter')
const quizQuestion = require('./routes/quizQuestionRouter')
//importing the modules
const categoryModel = require('./models/category')
const materialModel = require('./models/material')
const userModel = require('./models/user')
const quizModel = require('./models/quiz')
const mongoose = require('mongoose')

const port = 3000
var http = require('http').createServer(app)

/////// To connecte with mongoose database

uri = "mongodb+srv://cyber:1988@cluster0.rdylz.mongodb.net/CSAMS_F&K?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }).catch(e => {
    console.log(e);
  })
 
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))
  
  // Serve Static Files from /public
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(cors())
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )
  
  // Routes ----------------------------------------------
  app.use('/', require('./routes/pages'))
  app.use('/user', userRoute)
  app.use('/department', departmentRoute)
  app.use('/category', categoryRoute)
  app.use('/material', materialRouter)
  app.use('/quiz', quizRoute)
  app.use('/quizQuestion', quizQuestion)
  
  // all get requset to render view
  app.get('/sign-up', async (req, res) => {
    let dep = await departmentModel.find().lean()
    console.log(dep)
    res.render('registration.ejs', { data: { department: dep } })
  })
  app.get('/Login', async (req, res) => {
    res.render('login.ejs', { data: {} })
  })
  app.get('/home', async (req, res) => {
    let dep = await departmentModel.find().lean()
    let category = await categoryModel.find().lean()
    res.render('home.ejs', { data: { department: dep, category: category } })
  })
  
  app.get('/department', async (req, res) => {
    let dep = await departmentModel.find().lean()
  
    res.render('department.ejs', { data: { department: dep } })
  })
  app.get('/category', async (req, res) => {
    let category = await categoryModel.find().lean()
    res.render('category.ejs', { data: { category: category } })
  })
  app.get('/material', async (req, res) => {
    let category = await categoryModel.find().lean()
    let material = await materialModel.find().lean()

    return res.render('material.ejs', {
      data: { category: category, material: material },
    })
  })
  
  app.get('/user', async (req, res) => {
    let users = await userModel.find().lean()
  
    res.render('users.ejs', { data: { user: users } })
  })
  app.get('/quiz', async (req, res) => {
    let users = await userModel.find().lean()
    let category = await categoryModel.find().lean()
    let quiz = await quizModel.find().lean()
  
    res.render('quiz.ejs', {
      data: { user: users, category: category, quiz: quiz },
    })
  })
  
  http.listen(port, function () {
    console.log(`listening on port ${port}...`)
  })
  // using socket .io for realtime connection if server to the client
  const io = require('socket.io')(http)
  
  //function us used to connect client with server
  io.on('connection', (socket) => {
    console.log('connected...')
  
    //socket.emit("message","messege recieve")
  })
  
  const socketConnection = io
  
  module.exports.sockets = socketConnection
  