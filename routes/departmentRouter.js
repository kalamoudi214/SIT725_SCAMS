const express = require("express");
const router = express.Router();

// To call createDepartment function on controllers/department

const depController = require("../controllers/department");

router.post("/create", depController.createDepartment),


module.exports = router;