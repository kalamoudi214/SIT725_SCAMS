const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const port = 3000

//conection with MongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://SIT_725:1986@cluster0.rdylz.mongodb.net/CSAMS_F&K?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
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
