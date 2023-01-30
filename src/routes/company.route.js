const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyIsCompany = require("../middlewares/verifyIsCompany");
const {
  checkUserData,
  checkCompanyData,
  validation,
} = require("../middlewares/validators");

router.get("/", verifyToken, verifyIsCompany, companyController.getCompany);
router.get(
  "/getFreelanceProfile/:freelanceid",
  verifyToken,
  verifyIsCompany,
  companyController.getFreelanceProfile
);
router.get(
  "/getAllFreelances",
  verifyToken,
  verifyIsCompany,
  companyController.getAllFreelances
);

router.put(
  "/updateMyProfile",
  checkUserData,
  checkCompanyData,
  validation,
  verifyToken,
  verifyIsCompany,
  companyController.updateMyProfile
);
router.post("/createTask",  verifyToken,verifyIsCompany,companyController.createTask);

router.delete("/deleteTask/:taskid", verifyToken,verifyIsCompany,companyController.deleteTask);

router.put("/updateTask/:taskid",verifyToken,verifyIsCompany, companyController.updateTask);

module.exports = router;
