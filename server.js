const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const port = 3000


// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Serve Static Files from /public
app.use(express.static(path.join(__dirname, 'public')));


// Routes ----------------------------------------------
app.use('/', require('./routes/pages'))

app.listen(port, function () {
    console.log(`listening on port ${port}...`)
})
