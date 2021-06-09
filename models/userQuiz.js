const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  userId: { type: String },
  quizId: { type: String },
  score: { type: Number },
  total: { type: Number },
})

module.exports = mongoose.model('userQuiz', schema, 'userQuiz')
