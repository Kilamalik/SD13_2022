const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorizations denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.admin = decoded.admin;
    req.instructor = decoded.instructor;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
