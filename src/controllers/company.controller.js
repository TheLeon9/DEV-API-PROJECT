const assignmentModels = require("../models/assignment.models");
const companyModels = require("../models/company.models");
const freelanceModels = require("../models/freelance.models");

// GET
exports.getCompany = (req, res) => {
  companyModels
    .findById(req.userToken.id)
    .then((company) => {
      if (!company) {
        return res.status(404).send({
          message: "The User Company have not been found",
        });
      }
      console.log("The Company have been found");
      res.send(company);
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
  let minTax = req.body.minTax;
  let maxTax = req.body.maxTax;
  let minYearEx = req.body.minYearEx;
  let maxYearEx = req.body.maxYearEx;
  freelanceModels
    .find()
    .then((freelances) => {
      if (
        minTax != undefined &&
        maxTax != undefined &&
        minYearEx != undefined &&
        maxYearEx != undefined
      ) {
        console.log("filter");
        let arr = [];
        for (let valeur of freelances) {
          if (
            valeur.dailyTax >= minTax &&
            valeur.dailyTax <= maxTax &&
            valeur.yearEx >= minYearEx &&
            valeur.yearEx <= maxYearEx
          ) {
            arr.push(valeur);
          }
        }
        if (arr.length != 0) {
          res.send(arr);
          console.log("Users found");
        } else {
          return res.status(404).send({
            message: "Nobody Found with this filter",
          });
        }
      } else {
        console.log("no filter");
        res.send(freelances);
      }
    })
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
        "Freelance User with : " + freelance.userMail + " already Exist"
      );
      return res.status(404).send({
        message:
          "Freelance User with : " + freelance.userMail + " already exist !",
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
  const newTask = new assignmentModels(req.body);
  if (
    req.body.assignmentStatus != "en cours" &&
    req.body.assignmentStatus != "clôturé"
  ) {
    return res.status(404).send({
      message: "Choose between en |en cours| or |clôturé| for the status !",
    });
  } else {
    if (req.body.assignmentPeopleId.length > 3 && req.body.assignmentPeopleId.length > 0) {
      return res.status(404).send({
        message: "You need to assign 3 Freelances at max And 1 at min !",
      });
    } else {
      if (
        newTask.assignmentPeopleId[0].equals(newTask.assignmentPeopleId[1]) ||
        newTask.assignmentPeopleId[0].equals(newTask.assignmentPeopleId[2]) ||
        newTask.assignmentPeopleId[1].equals(newTask.assignmentPeopleId[2])
      ) {
        return res.status(404).send({
          message: "You need to select 3 different Freelances !",
        });
      } else {
        console.log("Task : " + req.body.assignmentTitle + " created !");
        assignmentModels
          .create(req.body)
          .then((task) => {
            for (
              let index = 0;
              index < task.assignmentPeopleId.length;
              index++
              ) {
              freelanceModels
              .findByIdAndUpdate(
                { _id: task.assignmentPeopleId[index] },
                { $push: { assignements: task._id } }
                )
              }
              res.status(200).send({
                message: "Freelance(s) have been added"
              });
          })
          .catch((err) => res.status(404).send(err));
      }
    }
  }
};
