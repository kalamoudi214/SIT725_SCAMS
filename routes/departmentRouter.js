const express = require("express");
const router = express.Router();

const userController = require("../controllers/department");

router.post("/create", userController.createDepartment),


module.exports = router;