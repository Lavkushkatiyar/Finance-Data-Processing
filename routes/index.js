const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const recordRoutes = require("./record.routes");
const adminRoutes = require("./admin.routes");
const router = express.Router();

const dashboardRoutes = require("./dashboard.routes");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/record", recordRoutes);

router.use("/admin", adminRoutes);
router.use("/dashboard", dashboardRoutes);
module.exports = router;
