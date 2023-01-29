const express = require("express");
const router = express.Router();
const freelanceController = require("../controllers/freelance.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyIsFreelance = require("../middlewares/verifyIsFreelance");

// router.get("/",verifyToken,  freelanceController.getFreelance);
// router.get("/Freelance", verifyToken, verifyIsFreelance, freelanceController.getFreelance);
// router.put("/updateMyProfil/:myid", freelanceController.updateMyProfil);

// router.post("/AcceptTask/:taskid", freelanceController.AcceptTask)
// router.post("/DenyTask/:taskid", freelanceController.DenyTask)

module.exports = router;