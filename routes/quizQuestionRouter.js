const express = require('express')
const router = express.Router()

const quizQuestionController = require('../controllers/quizQuestion')

router.get('/:quizId', quizQuestionController.fetchQuizQuestion)
router.post('/', quizQuestionController.createQuestion)
router.post('/check', quizQuestionController.checkQuestion)
//Scor for user
router.post('/getQuizByOneuser', quizQuestionController.getQuizByOneuser)

//Dachbord based on
router.post('/getQuizByuser', quizQuestionController.getQuizByUsers)



module.exports = router
