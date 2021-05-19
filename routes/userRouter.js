const express = require("express");
const router = express.Router();

//  // To call creatUser or Login function on controllers/User
const userController = require("../controllers/user");

router.post("/create", userController.createUser);
router.post('/login',userController.loginUser )



module.exports = router;