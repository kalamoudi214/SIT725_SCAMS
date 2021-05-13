const express = require("express");
const router = express.Router();

const userController = require("../controllers/department");

router.post("/create", userController.createDepartment),
 // router.get("/listskus", SkuMappingController.listSkus);
// router.get("/get",SkuMappingController.fechsku)

module.exports = router;