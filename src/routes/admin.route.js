const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const verifyToken = require("../middlewares/verifyToken");
const { verifyIsAdmin } = require("../middlewares/verifyIsAdmin");
const {
  checkSkill,
  checkJob,
  validation,
} = require("../middlewares/validatorsAdmin");
const {
  checkUserData,
  checkCompanyData,
  checkFreelanceData,
} = require("../middlewares/validators");

// router.get("/",verifyToken, ,verifyIsAdmin adminController.getAdmin);
router.get(
  "/getCompanies",
  verifyToken,
  verifyIsAdmin,
  adminController.getCompanies
);
router.get(
  "/getFreelances",
  verifyToken,
  verifyIsAdmin,
  adminController.getFreelances
);
// A verifier
router.get(
  "/getAssignments",
  verifyToken,
  verifyIsAdmin,
  adminController.getAssignments
);
router.get("/getSkills", verifyToken, verifyIsAdmin, adminController.getSkills);
router.get("/getJobs", verifyToken, verifyIsAdmin, adminController.getJobs);

router.put(
  "/updateFreelance/:userid",
  checkUserData,
  checkFreelanceData,
  validation,
  verifyToken,
  verifyIsAdmin,
  adminController.updateFreelance
);
router.put(
  "/updateCompany/:userid",
  checkUserData,
  checkCompanyData,
  validation,
  verifyToken,
  verifyIsAdmin,
  adminController.updateCompany
);
router.put(
  "/updateSkill/:skillid",
  checkSkill,
  validation,
  verifyToken,
  verifyIsAdmin,
  adminController.updateSkill
);
router.put(
  "/updateJob/:jobid",
  checkJob,
  validation,
  verifyToken,
  verifyIsAdmin,
  adminController.updateJob
);

router.delete(
  "/deleteCompany/:companyid",
  verifyToken,
  verifyIsAdmin,
  adminController.deleteCompany
);
router.delete(
  "/deleteFreelance/:freelanceid",
  verifyToken,
  verifyIsAdmin,
  adminController.deleteFreelance
);
router.delete(
  "/deleteSkill/:skillid",
  verifyToken,
  verifyIsAdmin,
  adminController.deleteSkill
);
router.delete(
  "/deleteJob/:jobid",
  verifyToken,
  verifyIsAdmin,
  adminController.deleteJob
);

router.post(
  "/createSkill",
  checkSkill,
  validation,
  verifyToken,
  verifyIsAdmin,
  adminController.createSkill
);
router.post(
  "/createJob",
  checkJob,
  validation,
  verifyToken,
  verifyIsAdmin,
  adminController.createJob
);

module.exports = router;
