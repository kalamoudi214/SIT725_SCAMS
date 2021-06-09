const quiz = require('../models/quiz')
const category = require('../models/category')
const userQuiz = require('../models/userQuiz')
const creatQuiz = async (req, res) => {
  try {
    let data = req.body
    let initialQuizes = await quiz.find()
    let check = initialQuizes.find((element) => element.name === data.name)
    let Category = await category.find().lean()
    if (!check) {
      let result = await quiz.create({ ...data })
      //res.status(200).json({data: result })
      let cat = await quiz.find().lean()
      // let a = await socket.sockets.emit('message', { type: 'material' })

      res.render('quiz.ejs', {
        data: {
          success: 'quiz Created Successfully',
          quiz: cat,
          category: Category,
        },
      })
    } else {
      //res.status(400).json({message: 'quiz already exist' })
      res.render('quiz.ejs', {
        data: {
          error: 'quiz already exist',
          quiz: initialQuizes,
          category: Category,
        },
      })
    }
  } catch (e) {
    console.log(e)
    res.json({ error: 'There is an error while creating quiz' })
  }
}

const checkUserQuiz = async (req, res) => {
  let { body } = req
  let check = await userQuiz.findOne({
    userId: body.userId,
    quizId: body.quizId,
  })
  if (check) {
    res.status(200).json({ data: false })
  } else {
    res.status(200).json({ data: true })
  }
}

module.exports = { creatQuiz, checkUserQuiz }
