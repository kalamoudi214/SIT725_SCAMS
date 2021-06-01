const express = require("express");
const router = express.Router();

// To call createDepartment function on controllers/department

const depController = require("../controllers/department");

router.post("/", depController.createDepartment),
router.get("/", depController.getViewDepartment),


module.exports = router;