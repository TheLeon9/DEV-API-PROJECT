const freelanceModels = require("../models/freelance.models");

// Consultation de freelance
exports.getAllFreelances = (req, res) => {
  freelanceModels
    .find()
    .then((freelances) => res.send(freelances))
    .catch((err) => res.status(400).send(err));
};

// Recherche
function err(res, params, name) {
  console.log(params);
  console.log("Freelance with " + name + " : " + params + " didn't been find");
  return res.status(404).send({
    message: "Freelance with " + name + " : " + params + " didn't been find !",
  });
}
exports.searchByFirstName = (req, res) => {
  freelanceModels
    .findOne({ firstName: req.params.firstname })
    .then((freelance) => {
      if (!freelance) {
          err(res, req.params.firstname, "FirstName");
      } else {
        res.send(freelance);
      }
    });
};
exports.searchByLastName = (req, res) => {
  freelanceModels
    .findOne({ lastName: req.params.lastname })
    .then((freelance) => {
      if (!freelance) {
          err(res, req.params.lastname, "LastName");
      } else {
        res.send(freelance);
      }
    });
};
exports.searchByCityName = (req, res) => {
  freelanceModels
    .findOne({ userCity: req.params.cityname })
    .then((freelance) => {
      if (!freelance) {
          err(res, req.params.cityname, "CityName");
      } else {
        res.send(freelance);
      }
    });
};
exports.searchBySkillName = (req, res) => {
  freelanceModels
    .findOne({ skills: req.params.skillname })
    .then((freelance) => {
      if (!freelance) {
          err(res, req.params.cityname, "SkillName");
      } else {
        res.send(freelance);
      }
    });
};
exports.searchByJobName = (req, res) => {
  freelanceModels
    .findOne({ jobs: req.params.jobname })
    .then((freelance) => {
      if (!freelance) {
          err(res, req.params.jobname, "JobName");
      } else {
        res.send(freelance);
      }
    });
};
