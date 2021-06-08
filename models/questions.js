const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  statement: { type: String },
  option: { type: Array },
  answer: { type: String },
  quizId: { type: String },
})

module.exports = mongoose.model('questions', schema, 'questions')
