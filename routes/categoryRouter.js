const express = require("express");
const router = express.Router();

// To call createCategory function on controllers/category

const catController = require("../controllers/category");

router.post("/", catController.createCategory),
router.get("/",catController.getViewCategory),


module.exports = router;