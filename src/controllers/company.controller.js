const assignmentModels = require("../models/assignment.models");
const companyModels = require("../models/company.models");
const freelanceModels = require("../models/freelance.models");

// GET
exports.getCompany = (req, res) => {
  companyModels
    .findById(req.userToken.id)
    .then((freelance) => {
      if (!freelance) {
        return res.status(404).send({
          message: "The User Company have not been found",
        });
      }
      console.log("The Company have been found");
      res.send(freelance);
    })
    .catch((err) => res.status(400).send(err));
};
exports.getFreelanceProfile = (req, res) => {
  freelanceModels
    .findById(req.params.freelanceid)
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
exports.getAllFreelances = (req, res) => {
  freelanceModels
    .find()
    .then((freelances) => res.send(freelances))
    .catch((err) => res.status(400).send(err));
};

// UPDATE
exports.updateMyProfile = (req, res) => {
  freelanceModels.findOne({ userMail: req.body.userMail }).then((freelance) => {
    if (!freelance) {
      companyModels.findOne({ userMail: req.body.userMail }).then((company) => {
        if (!company) {
          companyModels
            .findByIdAndUpdate(req.userToken.id, req.body)
            .then((userselected) => {
              if (!userselected) {
                return res.status(404).send({
                  message: "Company User have not been found",
                });
              }
              companyModels.findById(userselected._id).then((userupdated) => {
                res.send(userupdated);
              });
            })
            .catch((err) => res.status(400).send(err));
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
    } else {
      console.log(
        "Company User with : " + freelance.userMail + " already Exist"
      );
      return res.status(404).send({
        message:
          "Company User with : " + freelance.userMail + " already exist !",
      });
    }
  });
};
exports.updateTask = (req, res) => {
  assignmentModels
    .findByIdAndUpdate(req.params.taskid, req.body)
    .then((taskselected) => {
      if (!taskselected) {
        return res.status(404).send({
          message: "Task have not been found",
        });
      }
      assignmentModels.findById(taskselected._id).then((taskupdate) => {
        res.send(taskupdate);
      });
    })
    .catch((err) => res.status(400).send(err));
};

// DELETE
exports.deleteTask = (req, res) => {
  assignmentModels
    .findByIdAndDelete(req.params.taskid)
    .then((task) => {
      console.log("Task : " + task.assignmentTitle + " deleted !");
      res.send(task);
    })
    .catch((err) => res.status(400).send(err));
};
// CREATE
exports.createTask = (req, res) => {
  assignmentModels
    .create(req.body)
    .then((task) => {
      console.log(task.assignmentStatus);
      if (
        task.assignmentStatus != "en cours" &&
        task.assignmentStatus != "clôturé"
      ) {
        return res.status(404).send({
          message: "Choose between en |en cours| or |clôturé| for the status !",
        });
      } else {
        if (task.assignmentPeopleId.length > 3) {
          return res.status(404).send({
            message: "You need to assign 3 Freelances at max !",
          });
        } else {
          console.log("Task : " + task.assignmentTitle + " created !");
          res.send(task);
        }
      }
    })
    .catch((err) => res.status(404).send(err));
};
