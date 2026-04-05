const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const apiRoutes = require("./api.routes");
const recordRoutes = require("./record.routes");
const adminRoutes = require("./admin.routes")
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/api", apiRoutes);
router.use("/record", recordRoutes);

router.use("/admin",adminRoutes)
module.exports = router;
