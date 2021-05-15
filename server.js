const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRouter');
const categoryRoute = require('./routes/categoryRouter')
const departmentRoute= require('./routes/departmentRouter')
const materialRouter = require('./routes/materialRoute');
const departmentModel = require('./models/department');
const categoryModel = require('./models/category');
const userModel = require('./models/user')

const mongoose = require("mongoose");
const port = 3000

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


uri = "mongodb+srv://cyber:1988@cluster0.rdylz.mongodb.net/CSAMS_F&K?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }).catch(e => {
    console.log(e);
  })
 
// Serve Static Files from /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true
}));

// Routes ----------------------------------------------
app.use('/', require('./routes/pages'))
app.use('/user',userRoute)
app.use('/department',departmentRoute )
app.use('/category',categoryRoute)
app.use('/material',materialRouter)
app.get('/sign-up',async (req,res)=>{
    let dep = await departmentModel.find().lean();
    console.log(dep)
    res.render('registration.ejs',{data:{department:dep}})
})
app.get('/Login',async (req,res)=>{
    res.render('login.ejs',{data:{}})
})
app.get('/home',async (req,res)=>{
    res.render('home.ejs')
})

app.get('/department',async (req,res)=>{
    let dep = await departmentModel.find().lean();
    
    res.render('department.ejs',{data:{department:dep}})
})
app.get('/category',async (req,res)=>{
    let category = await categoryModel.find().lean();
    res.render('category.ejs',{data:{category: category}})
})
app.get('/material',async (req,res)=>{
    let category = await categoryModel.find().lean();
    res.render('material.ejs',{data:{category: category}})
})

app.get('/user',async (req,res)=>{
    let users = await userModel.find().lean();
    
    res.render('users.ejs',{data:{user:users}})
})



app.listen(port, function () {
    console.log(`listening on port ${port}...`)
})
