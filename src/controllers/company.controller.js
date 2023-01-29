const Company = require("../models/company.models");

exports.getCompany = (req, res) => {
    console.log(req);
    Company.findById(req.userToken.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
        message: "The User from a Company have not been found"
      })
    }
      res.send(user);
  })
  .catch(err => res.status(400).send(err)) 
}
