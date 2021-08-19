const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const authRoutes = require("./auth");
const protectedRoutes = require("./protected");

const router = express.Router();

router.use("/", authRoutes);
router.use("/", requireAuth, protectedRoutes);

module.exports = router;
