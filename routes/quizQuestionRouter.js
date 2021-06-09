const express = require('express')
const router = express.Router()

const quizQuestionController = require('../controllers/quizQuestion')

router.get('/:quizId', quizQuestionController.fetchQuizQuestion)
router.post('/', quizQuestionController.createQuestion)
router.post('/check', quizQuestionController.checkQuestion)


module.exports = router
