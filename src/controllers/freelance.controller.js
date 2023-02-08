const freelanceModels = require("../models/freelance.models");
const companyModels = require("../models/company.models");

// GET
exports.getFreelance = (req, res) => {
  freelanceModels
    .findById(req.userToken.id)
    .then((freelance) => {
      if (!freelance) {
        return res.status(404).send({
          message: "The User Freelance have not been found",
        });
      }
      console.log("The Freelance have been found");
      res.send(freelance);
    })
    .catch((err) => res.status(400).send(err));
};
// UPDATE
exports.updateMyProfile = (req, res) => {
  companyModels.findOne({ userMail: req.body.userMail }).then((company) => {
    if (!company) {
      freelanceModels.findOne({ userMail: req.body.userMail }).then((freelance) => {
        if (!freelance) {
          freelanceModels
            .findByIdAndUpdate(req.userToken.id, req.body)
            .then((userselected) => {
              if (!userselected) {
                return res.status(404).send({
                  message: "Freelance User have not been found",
                });
              }
              freelanceModels.findById(userselected._id).then((userupdated) => {
                res.send(userupdated);
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          console.log(
            "Freelance User with : " + freelance.userMail + " already Exist"
          );
          return res.status(404).send({
            message:
              "Freelance User with : " + freelance.userMail + " already exist !",
          });
        }
      });
    } else {
      console.log(
        "Company User with : " + company.userMail + " already Exist"
      );
      return res.status(404).send({
        message:
          "Company User with : " + company.userMail + " already exist !",
      });
    }
  });
};