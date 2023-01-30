const Admin = require("../models/admin.models");
const Company = require("../models/company.models");
const Freelance = require("../models/freelance.models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Register Admin
exports.registerA = async (req, res) => {
  Admin.find().then((admin) => {
    if (!admin) {
      const newAdmin = new Admin(req.body);
      newAdmin
        .save()
        .then((admin) => {
          res.status(201).send({
            message:
              "Admin : " +
              admin.firstName +
              " | " +
              admin.lastName +
              " has been registered !",
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }else{
      return res.status(404).send({
        message: "An Admin already exist",
      });
    }
  });
};

// Register Company
exports.registerC = async (req, res) => {
  const newCompany = new Company(req.body);
  newCompany
    .save()
    .then((company) => {
      res.status(201).send({
        message:
          "User : " +
          company.firstName +
          " | " +
          company.lastName +
          " from company " +
          company.companyName +
          " has been registered !",
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// Register Freelance
exports.registerF = async (req, res) => {
  const newFreelance = new Freelance(req.body);
  newFreelance
    .save()
    .then((freelance) => {
      res.status(201).send({
        message:
          "Freelance : " +
          freelance.firstName +
          " | " +
          freelance.lastName +
          " has been registered !",
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// Function for LogIn
function Search(req, res, userdata) {
  let passwordValid = bcrypt.compareSync(
    req.body.userPassword,
    userdata.userPassword
  );
  if (!passwordValid) {
    console.log("Your Password is not valid");
    return res.status(401).send({
      message: "User Password is not valid",
      auth: false,
    });
  }
  let userToken = jwt.sign(
    {
      id: userdata._id,
      isAdmin: userdata.isAdmin,
      accountType: userdata.accountType,
    },
    process.env.JWT_SECRET
  );
  console.log(userdata.userMail + " | Is now Connected");
  res.send({
    message:
      "The " +
      userdata.accountType +
      " : " +
      userdata.lastName +
      " | " +
      userdata.firstName +
      " is now logged !",
    auth: true,
    token: userToken,
  });
}
// Login
exports.login = (req, res) => {
  Company.findOne({ userMail: req.body.userMail }).then((userdata) => {
    if (userdata) {
      console.log("User find in Company");
      Search(req, res, userdata);
    }
    if (!userdata) {
      console.log("User not find in Company");
      Freelance.findOne({ userMail: req.body.userMail }).then((userdataF) => {
        console.log("Search in Freelance");
        if (userdataF) {
          console.log("User find in Freelance");
          Search(req, res, userdataF);
        }
        if (!userdataF) {
          console.log("User not find in Freelance");
          return res.status(404).send({
            message: "User " + req.body.userMail + " have not been found",
          });
        }
      });
    }
  });
};

// Login Admin
exports.loginA = (req, res) => {
  Admin.findOne({ adminMail: req.body.adminMail })
    .then((admin) => {
      if (!admin) {
        return res.status(404).send({
          message: "Admin : " + req.body.userMail + " have not been found",
        });
      }
      let passwordValid = bcrypt.compareSync(
        req.body.adminPassword,
        admin.adminPassword
      );
      if (!passwordValid) {
        return res.status(401).send({
          message: "Your Password is not valid",
          auth: false,
        });
      }
      let adminToken = jwt.sign(
        {
          id: admin._id,
          isAdmin: admin.isAdmin,
          accountType: admin.accountType,
        },
        process.env.JWT_SECRET
      );
      console.log(admin.adminMail + " | Admin is now Connected");
      res.send({
        message:
          "the " +
          admin.accountType +
          " : " +
          admin.lastName +
          " | " +
          admin.firstName +
          " is now logged !",
        auth: true,
        token: adminToken,
      });
    })
    .catch((err) => res.Status(400).send(err));
};
