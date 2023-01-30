function verifyIsCompany(req, res, next) {
  if (req.userToken.accountType != "Company") {
    res.status("401").send({
      auth: false,
      message: "You must be a Company",
    });
  }
  next();
}

module.exports = verifyIsCompany;
