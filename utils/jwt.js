const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const getToken = ({ id, role }, time = "1h") =>
  jwt.sign({ id, role: role.name || role }, JWT_SECRET, { expiresIn: time });

module.exports = {
  getToken,
};
