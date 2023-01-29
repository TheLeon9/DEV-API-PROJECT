const { body, validationResult } = require("express-validator");

exports.checkSkill = [
  body("skillName")
    .isLength({ min: 2, max: 50 })
    .withMessage("Skill format is not valide"),
];
exports.checkJob = [
  body("jobName")
    .isLength({ min: 3, max: 50 })
    .withMessage("Job format is not valide"),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array(),
    });
  }

  next();
};
