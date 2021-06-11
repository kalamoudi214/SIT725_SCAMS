const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quiz')

router.post('/', quizController.creatQuiz)
router.post('/checkQuiz', quizController.checkUserQuiz)



module.exports = router
