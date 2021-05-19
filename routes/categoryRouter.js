const express = require("express");
const router = express.Router();

// To call createCategory function on controllers/category

const catController = require("../controllers/category");

router.post("/create", catController.createCategory),


module.exports = router;