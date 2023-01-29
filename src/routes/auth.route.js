const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { checkUserData,checkAdminData,checkCompanyData, checkFreelanceData, checkLoginAdmin, checkLoginUser, validation} = require("../middlewares/validators");

router.post("/registerAdmin", checkAdminData,  validation, authController.registerA);
router.post("/registerCompany", checkUserData,  checkCompanyData, validation, authController.registerC);
router.post("/registerFreelance", checkUserData,  checkFreelanceData, validation, authController.registerF);
router.post("/login", checkLoginUser, validation, authController.login);
router.post("/loginAdmin", checkLoginAdmin, validation, authController.loginA);

module.exports = router;