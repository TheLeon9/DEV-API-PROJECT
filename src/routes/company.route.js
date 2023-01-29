const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyIsCompany = require("../middlewares/verifyIsCompany");

router.get("/",verifyToken, verifyIsCompany, companyController.getCompany);
// router.put("/updateMyProfile/:id", verifyIsCompany, companycompanyController.UpdateMe)
// router.get("/getFreelanceProfile/:freelanceid", companyController.getFreelanceProfile);

// router.post("/createTask", companyController.createTaks);

// router.delete("/deleteTask/:idtask", companyController.deleteTask);

// router.put("/updateTask/:idtask", companyController.updateTask);

module.exports = router;