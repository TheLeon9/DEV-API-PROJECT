const { body, validationResult } = require("express-validator");

// Register
exports.checkAdminData = [
  body("firstName")
    .isAlphanumeric()
    .isLength({ min: 3, max: 20 })
    .withMessage("FirstName format is not valide"),
  body("lastName")
    .isAlphanumeric()
    .isLength({ min: 3, max: 20 })
    .withMessage("LastName format is not valide"),
  body("adminMail").isEmail().withMessage("Email format not valid"),
  body("adminPassword")
    .notEmpty()
    .isLength({ min: 6, max: 50 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/),
];
exports.checkUserData = [
  body("firstName")
    .isAlphanumeric()
    .isLength({ min: 3, max: 20 })
    .withMessage("FirstName format is not valide"),
  body("lastName")
    .isAlphanumeric()
    .isLength({ min: 3, max: 20 })
    .withMessage("LastName format is not valide"),
  body("userMail").isEmail().withMessage("Email format not valid"),
  body("userPassword")
    .notEmpty()
    .isLength({ min: 6, max: 50 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/),
];

exports.checkCompanyData = [
  body("companyStatus").custom((value) => {
    if (value != "SAS" && value != "SASU" && value != "SARL" && value != "EURL") {
      throw new Error(
        "Company Status is not Valid, choose between : SAS | SASU | SARL | EURL"
      );
    }
    return true;
  }),
  body("companySiret")
  .isAlphanumeric()
  .isLength({ min: 9, max: 9 })
  .withMessage("Siret format is not valide"),
];

exports.checkFreelanceData = [
  body("yearEx")
  .isAlphanumeric()
  .isLength({ min: 0, max: 100 })
  .withMessage("Number of years format is not valide"),
];

// Login
exports.checkLoginAdmin = [
  body("adminMail").isEmail().withMessage("Email format not valid"),
  body("adminPassword")
    .notEmpty()
    .isLength({ min: 6, max: 50 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/),
];

exports.checkLoginUser = [
  body("userMail").isEmail().withMessage("Email format not valid"),
  body("userPassword")
    .notEmpty()
    .isLength({ min: 6, max: 50 })
    .matches(/^[A-Za-z0-9 .,'!&(§è!çà)]+$/),
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
