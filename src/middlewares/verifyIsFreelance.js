function verifyIsFreelance(req, res, next) {
  console.log(req.userToken);
  if (req.userToken.accountType != "Freelance") {
    res.status("401").send({
      auth: false,
      message: "You must be a Freelance",
    });
  }
  next();
}

module.exports = verifyIsFreelance;
