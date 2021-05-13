const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
//const userRoute = require('./routes/userRouter');
const departmentRoute= require('./routes/departmentRouter')
const mongoose = require("mongoose");
const port = 3000

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// uri = "mongodb+srv://SIT_725:1986@cluster0.tn3yg.mongodb.net/CSAMS_F&K?retryWrites=true&w=majority";
// mongoose.connect(uri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//   }).catch(e => {
//     console.log(e);
//   })
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true
}));

// Routes ----------------------------------------------
app.use('/', require('./routes/pages'))
app.use('/department',departmentRoute )

app.get('/department',async (req,res)=>{
 
    res.render('department.ejs',{data:{}})
})
app.get('/category',async (req,res)=>{
    res.render('category.ejs',{data:{}})
})




app.listen(port, function () {
    console.log(`listening on port ${port}...`)
})
