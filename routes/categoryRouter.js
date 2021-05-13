const express = require("express");
const router = express.Router();

const userController = require("../controllers/category");

router.post("/create", userController.createCategory),


module.exports = router;