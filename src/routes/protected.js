const express = require("express");
const protectedRoutes = express.Router();
const { allUsers, getUser, deleteUser, newToken } = require("../services/user");

const {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} = require("../services/todo");

protectedRoutes.get("/", getTodo);
protectedRoutes.post("/todo", createTodo);
protectedRoutes.delete("/:uuid", deleteTodo);
protectedRoutes.put("/:uuid", updateTodo);

protectedRoutes.get("/token", newToken);

protectedRoutes.get("/allusers", allUsers);
protectedRoutes.get("/user/:uuid", getUser);
protectedRoutes.delete("/deleteuser/:uuid", deleteUser);

module.exports = protectedRoutes;
