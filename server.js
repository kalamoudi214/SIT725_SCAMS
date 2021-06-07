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
const materialRouter = require('./routes/materialRoute')
const departmentModel = require('./models/department')

const mongoose = require('mongoose')

const port = 3000
var http = require('http').createServer(app)


// view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

/////// To connecte with mongoose database

uri = "mongodb+srv://cyber:1988@cluster0.rdylz.mongodb.net/CSAMS_F&K?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }).catch(e => {
    console.log(e);
  })
 

// Serve Static Files from /public
app.use(express.static(path.join(__dirname, 'public')))

// Middlewares => before and after request
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
  }),
)

// Routes ----------------------------------------------
app.use('/', require('./routes/pages'))
app.use('/user', userRoute)
app.use('/department', departmentRoute)
app.use('/category', categoryRoute)
app.use('/material', materialRouter)

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
  res.render('home.ejs')
})


http.listen(port, function () {
  console.log(`listening on port ${port}...`)
})
// using socket .io for realtime connection if server to the client
const io = require('socket.io')(http)

//function us used to connect client with server
io.on('connection', (socket) => {
  console.log('connected...')
  socket.emit("message","messege recieve")
})

const socketConnection = io

module.exports.sockets = socketConnection
