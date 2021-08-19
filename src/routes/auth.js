const express = require("express");
const { signIn, signOut, signUp } = require("../services/user");
const authRoutes = express.Router();

authRoutes.get("/signin", signIn);
authRoutes.post("/signup", signUp);
authRoutes.put("/signout", signOut);

module.exports = authRoutes;
