const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // let token = req.headers.authorization;
  let token =
  // freelance
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDdhOWI5MTkzYTU3MmRjODRjNGViNSIsImlzQWRtaW4iOmZhbHNlLCJhY2NvdW50VHlwZSI6IkZyZWVsYW5jZSIsImlhdCI6MTY3NTg2OTE5Mn0.Nzg_Oh0aTMmyJ5A8qMp6wDGAkQ10ZuqObNz9ka-TwSo";
    // company
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDdhOWIyMTkzYTU3MmRjODRjNGViMyIsImlzQWRtaW4iOmZhbHNlLCJhY2NvdW50VHlwZSI6IkNvbXBhbnkiLCJpYXQiOjE2NzUwNzgwNzl9.yQ1o5LyBVsnjyPFltvVypXiYYJ30fxdwtG0PEj-DiBw";
    // admin
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDQwNzhjMmNjODEwYjkwNjM5M2NjMyIsImlzQWRtaW4iOnRydWUsImFjY291bnRUeXBlIjoiQWRtaW4iLCJpYXQiOjE2NzU4NzAwMTV9.iUSbD0g_e87k7Oq-4TSUqw0pkUUNi6Igo0brtOHsoSc";
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
