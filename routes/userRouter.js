const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/',userController.getUserVeiw)
module.exports = router
