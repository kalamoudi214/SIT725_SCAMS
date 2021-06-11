const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    type: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('quiz', schema, 'quiz')
