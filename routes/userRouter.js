const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/create", userController.createUser);
router.post('/login',userController.loginUser )

 // router.get("/listskus", SkuMappingController.listSkus);
// router.get("/get",SkuMappingController.fechsku)

module.exports = router;