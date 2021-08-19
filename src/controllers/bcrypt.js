const bcrypt = require("bcryptjs");

export const pswd = [];

const hashPassword = (password) =>
  bcrypt
    .hash(password, 12)
    .then((hashPswd) => {
      pswd.push({
        status: "success",
        value: hashPswd,
      });
    })
    .catch((err) => {
      pswd.push({
        status: "failed",
        value: null,
      });
    });

module.exports = hashPassword;
