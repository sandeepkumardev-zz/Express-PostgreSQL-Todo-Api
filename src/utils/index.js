const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../../database/config");

const hashPswd = (password) => {
  return bcrypt.hash(password, 12);
};

const accessToken = (uuid) => {
  return jwt.sign({ _id: uuid }, JWT_SECRET, { expiresIn: "20s" });
};

const refreshToken = (uuid) => {
  return jwt.sign({ _id: uuid }, JWT_REFRESH_SECRET);
};

module.exports = { hashPswd, accessToken, refreshToken };
