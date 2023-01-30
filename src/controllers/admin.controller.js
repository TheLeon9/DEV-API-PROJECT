const admin = require("../models/admin.models");
const companyModels = require("../models/company.models");
const freelanceModels = require("../models/freelance.models");
const assignmentModel = require("../models/assignment.models");
const jobModel = require("../models/job.models");
const skillModel = require("../models/skill.models");

// GET
exports.getJobs = (req, res) => {
  jobModel
    .find()
    .then((jobs) => res.send(jobs))
    .catch((err) => res.status(400).send(err));
};
exports.getSkills = (req, res) => {
  skillModel
    .find()
    .then((skills) => res.send(skills))
    .catch((err) => res.status(400).send(err));
};
exports.getCompanies = (req, res) => {
  companyModels
    .find()
    .then((companies) => res.send(companies))
    .catch((err) => res.status(400).send(err));
};
exports.getFreelances = (req, res) => {
  freelanceModels
    .find()
    .then((freelances) => res.send(freelances))
    .catch((err) => res.status(400).send(err));
};
exports.getAssignments = (req, res) => {
  assignmentModel
    .find()
    .then((assignments) => res.send(assignments))
    .catch((err) => res.status(400).send(err));
};

// UPDATE
function Update(req, res, account, modelsfirst, modelsecond) {
  modelsfirst.findOne({ userMail: req.body.userMail }).then((freelance) => {
    if (!freelance) {
      modelsecond.findOne({ userMail: req.body.userMail }).then((company) => {
        if (!company) {
          modelsecond
            .findByIdAndUpdate(req.params.userid, req.body)
            .then((userselected) => {
              if (!userselected) {
                return res.status(404).send({
                  message: account + " User have not been found",
                });
              }
              modelsecond.findById(userselected._id).then((userupdated) => {
                res.send(userupdated);
              });
            })
            .catch((err) => res.status(400).send(err));
        } else {
          console.log(
            account + " User with : " + company.userMail + " already Exist"
          );
          return res.status(404).send({
            message:
              account + " User with : " + company.userMail + " already exist !",
          });
        }
      });
    } else {
      console.log(
        account + " User with : " + freelance.userMail + " already Exist"
      );
      return res.status(404).send({
        message:
          account + " User with : " + freelance.userMail + " already exist !",
      });
    }
  });
}
exports.updateFreelance = (req, res) => {
  Update(req, res, "Freelance", companyModels, freelanceModels);
};
exports.updateCompany = (req, res) => {
  Update(req, res, "Company", freelanceModels, companyModels);
};

exports.updateSkill = (req, res) => {
  skillModel.findOne({ skillName: req.body.skillName }).then((skill) => {
    if (!skill) {
      skillModel
        .findByIdAndUpdate(req.params.skillid, req.body)
        .then((skillselected) => {
          if (!skillselected) {
            return res.status(404).send({
              message: "Skill have not been found",
            });
          }
          skillModel.findById(skillselected._id).then((skillupdated) => {
            res.send(skillupdated);
          });
        })
        .catch((err) => res.status(400).send(err));
    } else {
      console.log("Skill : " + skill.skillName + " already Exist");
      return res.status(404).send({
        message: "Skill : " + skill.skillName + " already exist !",
      });
    }
  });
};
exports.updateJob = (req, res) => {
  jobModel.findOne({ jobName: req.body.jobName }).then((job) => {
    if (!job) {
      jobModel
        .findByIdAndUpdate(req.params.jobid, req.body)
        .then((jobselected) => {
          if (!jobselected) {
            return res.status(404).send({
              message: "Job have not been found",
            });
          }
          jobModel.findById(jobselected._id).then((jobupdated) => {
            res.send(jobupdated);
          });
        })
        .catch((err) => res.status(400).send(err));
    } else {
      console.log("Job : " + job.jobName + " already Exist");
      return res.status(404).send({
        message: "Job : " + job.jobName + " already exist !",
      });
    }
  });
};

// DELETE
exports.deleteCompany = (req, res) => {
  companyModels
    .findByIdAndDelete(req.params.companyid)
    .then((company) => {
      console.log("Company : " + company.userMail + " deleted !");
      res.send(company);
    })
    .catch((err) => res.status(400).send(err));
};
exports.deleteFreelance = (req, res) => {
  freelanceModels
    .findByIdAndDelete(req.params.freelanceid)
    .then((freelance) => {
      console.log("Freelance : " + freelance.userMail + " deleted !");
      res.send(freelance);
    })
    .catch((err) => res.status(400).send(err));
};
exports.deleteSkill = (req, res) => {
  skillModel
    .findByIdAndDelete(req.params.skillid)
    .then((skill) => {
      console.log("Skill : " + skill.skillName + " deleted !");
      res.send(skill);
    })
    .catch((err) => res.status(400).send(err));
};
exports.deleteJob = (req, res) => {
  jobModel
    .findByIdAndDelete(req.params.jobid)
    .then((job) => {
      console.log("Job : " + job.jobName + " deleted !");
      res.send(job);
    })
    .catch((err) => res.status(400).send(err));
};

// CREATE
exports.createSkill = (req, res) => {
  skillModel.findOne({ skillName: req.body.skillName }).then((skill) => {
    if (!skill) {
      skillModel
        .create(req.body)
        .then((skill) => {
          console.log("Skill : " + skill.skillName + " created !");
          res.send(skill);
        })
        .catch((err) => res.status(404).send(err));
    } else {
      console.log("Skill : " + skill.skillName + " already exist !");
      return res.status(404).send({
        message: "Skill : " + skill.skillName + " already exist !",
      });
    }
  });
};
exports.createJob = (req, res) => {
  jobModel.findOne({ jobName: req.body.jobName }).then((job) => {
    if (!job) {
      jobModel
        .create(req.body)
        .then((job) => {
          console.log("Job : " + job.jobName + " created !");
          res.send(job);
        })
        .catch((err) => res.status(404).send(err));
    } else {
      console.log("Job : " + job.jobName + " already exist !");
      return res.status(404).send({
        message: "Job : " + job.jobName + " already exist !",
      });
    }
  });
};
