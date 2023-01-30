const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // let token = req.headers.authorization;
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDdhOWIyMTkzYTU3MmRjODRjNGViMyIsImlzQWRtaW4iOmZhbHNlLCJhY2NvdW50VHlwZSI6IkNvbXBhbnkiLCJpYXQiOjE2NzUwNzgwNzl9.yQ1o5LyBVsnjyPFltvVypXiYYJ30fxdwtG0PEj-DiBw";
  if (!token) {
    return res.status(403).send({
      auth: false,
      token: null,
      message: "Your token is missing",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (error, jwtDecoded) {
    if (error) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: "unauthorized",
      });
    }
    req.userToken = jwtDecoded;
    next();
  });
}

module.exports = verifyToken;
