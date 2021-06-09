const quizQuestion = require('../models/questions')
const categoryModel = require('../models/category')
const materialModel = require('../models/material')
const userModel = require('../models/user')
const quizModel = require('../models/quiz')
const userQuiz = require('../models/userQuiz')
const departmentModel = require('./department')
const { find } = require('../models/user')
const createQuestion = async (req, res) => {
  try {
    let shuffle = async (array) => {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    }
    console.log('req.body')
    let { body } = req
    let option = []
    option.push(body.a)
    option.push(body.b)
    option.push(body.c)
    option.push(body.answer)

    option = await shuffle(option)

    let obj = {
      option: option,
      answer: body.answer,
      quizId: body.quizId,
      statement: body.statement,
    }
    let result = await quizQuestion.create(obj)
    let users = await userModel.find().lean()
    let category = await categoryModel.find().lean()
    let quiz = await quizModel.find().lean()


    res.redirect('/Quiz')
  } catch (e) {
    res.render('quiz.ejs', {
      data: {
        user: users,
        category: category,
        quiz: quiz,
        success: 'There is an error while adding a question on quiz',
      },
    })
  }
}

const fetchQuizQuestion = async (req, res) => {
  try {
    let { params } = req

    let questions = await quizQuestion.find({ quizId: params.quizId }).lean()
    console.log(questions)
    res.render('giveQuiz.ejs', {
      data: { questions: questions },
    })
  } catch (e) {
    console.log('vc')
  }
}

const checkQuestion = async (req, res) => {
  let { quizId, userId } = req.body
  let questions = await quizQuestion.find({ quizId: quizId })
  try {
    let user_quiz = await userQuiz.findOne({ userId: userId, quizId: quizId })
    if (!user_quiz) {
      let answers = Object.entries(req.body).filter((e) => {
        if (e[0] != 'quizId' && e[0] != 'userId') {
          return e[1]
        }
      })
      answers = answers.map((element) => {
        let ques = element[1].split('|')
        return {
          value: ques[0],
          id: ques[1],
        }
      })

 
      console.log('ggf')
      let count = 0
      let s


      questions.map((element) => {
        console.log(element._id.toString())
        let checkAns = answers.find((e) => e.id === element.id)
        if (checkAns) {
          if (element.answer.includes(checkAns.value)) {
            count++
          }
        }
      })

      let total = questions.length
      let saveScore = await userQuiz.create({
        userId: userId,
        quizId: quizId,
        total: total,
        score: count,
      })
      res.render('giveQuiz.ejs', {
        data: { questions: questions, success: { total: total, score: count } },
      })
    } else {
      res.render('giveQuiz.ejs', {
        data: {
          questions: questions,
          error: 'This user has already attemp this quiz',
        },
      })
    }
  } catch (e) {
    res.render('giveQuiz.ejs', {
      data: {
        questions: questions,
        error: 'Some thing went wrong',
      },
    })
  }
}


module.exports = {
  createQuestion,
  fetchQuizQuestion,
  checkQuestion,
}
