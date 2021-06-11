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
      // To get answer for useer
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

      // to compare answer for user with answer in database
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


// score for user
const getQuizByOneuser = async (req, res) => {
  let { userId } = req.body
  try {
    let quizes = await userQuiz.find({ userId: userId })
    let users = await userModel.find()
    let quiz = await quizModel.find()

    let result = []
    quizes.map((element) => {
      let findUser = users.find((e) => e._id.toString() === element.userId)
      let findQuiz = quiz.find((d) => d._id.toString() === element.quizId)
      if (findQuiz) {
        result.push({
          _id: element._id,
          userId: element.userId,
          quizId: element.quizId,
          total: element.total,
          score: element.score,
          userName: findUser.userName,
          department: findUser.department,
          quizName: findQuiz.name,
          quizCategory: findQuiz.category,
        })
      }
    })

    console.log(JSON.stringify(result))
    res.status(200).json({ data: result })
  } catch (e) {
    res.status(400).send('Something went wrong')
  }
}

// score for user in quiz page
const getQuizByUsers = async (req, res) => {
  try {
    let { userId } = req.body
    let quizIds = []
    let quizes = await quizModel.find()
    quizes.map((element) => {
      quizIds.push(element._id)
    })

    let data = await userQuiz.find({
      userId: userId,
    })
    let users = await userModel.find().lean()
    let a = JSON.stringify(users)
    users = JSON.parse(a)
    let result = []
    data.map((element) => {
      let findUser = users.find((e) => e._id === element.userId)
      let findQuiz = quizes.find((d) => d._id.toString() === element.quizId)
      if (findUser && findQuiz) {
        let checkRepeat = result.find(
          (el) => findQuiz.category === el.quizCategory,
        )
        if (checkRepeat) {
          let index = result.findIndex(
            (r) => r.quizCategory === findQuiz.category,
          )
          result[index].total += element.total
          result[index].score += element.score
          result[index].count += 1
          result[index].average =
            (result[index].score /
              result[index].count /
              (result[index].total / result[index].count)) *
            100
        } else {
          result.push({
            _id: element._id,
            userId: element.userId,
            quizId: element.quizId,
            total: element.total,
            score: element.score,
            userName: findUser.userName,
            department: findUser.department,
            quizName: findQuiz.name,
            quizCategory: findQuiz.category,
            count: 1,
            average: (element.score / element.total) * 100,
          })
        }
      }
    })

    console.log(JSON.stringify(result))
    res.status(200).json({ data: result })
  } catch (e) {
    console.log(e)
    res.status(200).json('something went wrong')
  }
}
module.exports = {
  createQuestion,
  fetchQuizQuestion,
  checkQuestion,
  getQuizByUsers,
  getQuizByOneuser,
}
