const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../database/config");
const { User } = require("../../database/models");

module.exports = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: "You must be logged in!" });
  }

  await jwt.verify(authorization, JWT_SECRET, (error, payload) => {
    if (error) {
      return response.status(403).json({ error: "You must be logged in!" });
    }

    const { _id } = payload;

    User.findOne({ where: { uuid: _id } })
      .then((userData) => {
        const user = {
          uuid: userData.dataValues.uuid,
          username: userData.dataValues.username,
          password: userData.dataValues.password,
        };

        request.user = user;

        next();
      })
      .catch((error) => console.log(error));
  });
};
