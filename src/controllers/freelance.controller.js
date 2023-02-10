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
      freelanceModels
        .findOne({ userMail: req.body.userMail })
        .then((freelance) => {
          if (!freelance) {
            freelanceModels
              .findByIdAndUpdate(req.userToken.id, req.body)
              .then((userselected) => {
                if (!userselected) {
                  return res.status(404).send({
                    message: "Freelance User have not been found",
                  });
                }
                freelanceModels
                  .findById(userselected._id)
                  .then((userupdated) => {
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
                "Freelance User with : " +
                freelance.userMail +
                " already exist !",
            });
          }
        });
    } else {
      console.log("Company User with : " + company.userMail + " already Exist");
      return res.status(404).send({
        message: "Company User with : " + company.userMail + " already exist !",
      });
    }
  });
};

// Accept or Decline
exports.acceptTasks = (req, res) => {
  const taskAccepted = req.body.acceptTask;
  let newTabTask = [];
  let find = false;
  freelanceModels.findById({ _id: req.userToken.id }).then((freelance) => {
    if (!freelance) {
      return res.status(404).send({
        message: "The User Freelance have not been found",
      });
    } else {
      for (let index = 0; index < freelance.assignements.length; index++) {
        if (taskAccepted == freelance.assignements[index]) {
          freelanceModels.findByIdAndUpdate(
            { _id: req.userToken.id },
            {
              $push: { assignementsAccepted:  freelance.assignements[index] },
            }
          );
          find = true;
        } else {
          newTabTask.push(freelance.assignements[index]);
        }
      }
      if (find) {
        freelanceModels.findByIdAndUpdate(req.userToken.id, { assignements: newTabTask })
        res.status(200).send({
          message: "New Assignments Tab update and Tab of Accepted Assignments Updated to ! "
        });
      } else {
        return res.status(404).send({
          message: "The User Freelance didn't have this Task",
        });
      }
    }
  });
};
exports.declineTasks = (req, res) => {
  const taskDeclined = req.body.declineTask;
  console.log(taskDeclined);
  let newTabTaskForCompany = [];
  let newTabTask = [];
  let find = false;
  freelanceModels.findById({ _id: req.userToken.id }).then((freelance) => {
    if (!freelance) {
      return res.status(404).send({
        message: "The User Freelance have not been found",
      });
    } else {
      for (let index = 0; index < freelance.assignements.length; index++) {
        if (taskDeclined == freelance.assignements[index]) {
            find = true;
        } else {
          newTabTask.push(freelance.assignements[index]);
        }
      }
      if (find) {
        assignmentModels.findById({ _id: taskDeclined }).then((task) => {
          if(!task){
            return res.status(404).send({
              message: "The Task have not been found",
            });
          }else{
            for (let index = 0; index < task.assignmentPeopleId.length; index++) {
              if (taskDeclined != task.assignmentPeopleId[index]) {
                newTabTaskForCompany.push(task.assignmentPeopleId[index]);
              }
            }
          }
        })
        assignmentModels.findByIdAndUpdate(taskDeclined, {assignmentPeopleId: newTabTaskForCompany})
        freelanceModels.findByIdAndUpdate(req.userToken.id, { assignements: newTabTask })
        res.status(200).send({
          message: "New Assignments Tab update and Assignments Tab on Company Side update to ! "
        });
      } else {
        return res.status(404).send({
          message: "The User Freelance didn't have this Task",
        });
      }
    }
  });
};
