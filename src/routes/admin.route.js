const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");
const {
  checkSkill,
  checkJob,
  validation,
} = require("../middlewares/validatorsAdmin");
const {
  checkUserData,
  checkCompanyData,
  checkFreelanceData
} = require("../middlewares/validators");

// router.get("/",verifyToken, ,verifyIsAdmin adminController.getAdmin);
router.get("/getCompanys", adminController.getCompanys);
router.get("/getFreelances", adminController.getFreelances);
// A verifier
router.get("/getAssignments", adminController.getAssignments);
router.get("/getSkills", adminController.getSkills);
router.get("/getJobs", adminController.getJobs);

router.put(
  "/updateFreelance/:userid",
  checkUserData,
  checkFreelanceData,
  validation,
  adminController.updateFreelance
);
router.put(
  "/updateCompany/:userid",
  checkUserData,
  checkCompanyData,
  validation,
  adminController.updateCompany
);
router.put(
  "/updateSkill/:skillid",
  checkSkill,
  validation,
  adminController.updateSkill
);
router.put(
  "/updateJob/:jobid",
  checkJob,
  validation,
  adminController.updateJob
);

router.delete("/deleteCompany/:companyid", adminController.deleteCompany);
router.delete("/deleteFreelance/:freelanceid", adminController.deleteFreelance);
router.delete("/deleteSkill/:skillid", adminController.deleteSkill);
router.delete("/deleteJob/:jobid", adminController.deleteJob);

router.post(
  "/createSkill",
  checkSkill,
  validation,
  adminController.createSkill
);
router.post("/createJob", checkJob, validation, adminController.createJob);

module.exports = router;
