const express = require("express");
const router = express.Router();
const visitorModel = require("../controllers/visitor.controller");

router.get(
  "/getAllFreelances",
  visitorModel.getAllFreelances
);
router.get(
  "/searchByFirstName/:firstname",
  visitorModel.searchByFirstName
);
router.get(
  "/searchByLastName/:lastname",
  visitorModel.searchByLastName
);
router.get(
  "/searchByCity/:cityname",
  visitorModel.searchByCityName
);
router.get(
  "/searchBySkill/:skillname",
  visitorModel.searchBySkillName
);
router.get(
  "/searchByJob/:jobname",
  visitorModel.searchByJobName
);

module.exports = router;
