const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  file_path: {
    type: String,
  },
  file_url: {
    type: String,
  },
  thumbnail_url: {
    type: String,
  },
  thumbnail_path: {
    type: String,
  },
})

module.exports = mongoose.model('material', schema, 'material')
