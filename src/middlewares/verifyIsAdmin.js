function verifyIsAdmin(req, res, next) {
  if (!req.userToken.isAdmin) {
    res.status("401").send({
      auth: false,
      message: "You must be an Admin",
    });
  }
  next();
}

module.exports = {verifyIsAdmin};
