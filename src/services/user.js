const { User } = require("../../database/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const exJwt = require("express-jwt");
const { JWT_REFRESH_SECRET } = require("../../database/config");
const { accessToken, refreshToken, hashPswd } = require("../utils");

let Token = [];

const newToken = async (request, response) => {
  const { refreshToken } = request.body;

  if (!refreshToken)
    return response.status(401).json({ error: "You must be logged in!" });
  if (!Token.includes(refreshToken))
    return response.status(403).json({ error: "You must be logged in!" });

  await jwt.verify(refreshToken, JWT_REFRESH_SECRET, (error, payload) => {
    if (error) {
      return response.status(403).json({ error: "You must be logged in!" });
    }

    const { _id } = payload;

    const token = accessToken(_id);

    response.json({ token });
  });
};

const signIn = async (request, response) => {
  const { username, password } = request.body;

  await User.findOne({ where: { username } })
    .then((data) => {
      bcrypt.compare(password, data.password).then((doMatch) => {
        if (doMatch) {
          const token = accessToken(data.uuid);
          const newToken = refreshToken(data.uuid);

          Token.push(newToken);

          response.json({ token, newToken });
        } else {
          response.status(400).send("Invalid info");
        }
      });
    })
    .catch((err) => response.status(400).json(err));
};

const signUp = async (request, response) => {
  const { username, password } = request.body;

  const hashpassword = await hashPswd(password);

  const newUser = {
    username,
    password: hashpassword,
  };

  await User.create(newUser)
    .then((data) => response.send(data))
    .catch((err) => response.status(400).send(err.errors[0]));
};

const signOut = (request, response) => {
  Token = [];
  response.send("sign out");
};

const allUsers = async (request, response) => {
  await User.findAll()
    .then((data) => response.send(data))
    .catch((err) => response.status(400).send(err));
};

const getUser = async (request, response) => {
  const uuid = request.params.uuid;

  await User.findOne({ where: { uuid }, include: "todos" })
    .then((data) => response.send(data))
    .catch((err) => response.status(400).send(err));
};

const deleteUser = async (request, response) => {
  const uuid = request.params.uuid;

  const user = await User.findOne({ where: { uuid } });

  await user
    .destroy()
    .then(() => response.send("User deleted!"))
    .catch((err) => response.status(400).send(err));
};

module.exports = {
  newToken,
  signIn,
  signUp,
  signOut,
  allUsers,
  getUser,
  deleteUser,
};
