const express = require("express");
const router = express.Router();

const userController = require("../controllers/category");

router.post("/create", userController.createCategory),
 // router.get("/listskus", SkuMappingController.listSkus);
// router.get("/get",SkuMappingController.fechsku)

module.exports = router;