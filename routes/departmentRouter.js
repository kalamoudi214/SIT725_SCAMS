const express = require("express");
const router = express.Router();

const userController = require("../controllers/department");

router.post("/", userController.createDepartment),


module.exports = router;