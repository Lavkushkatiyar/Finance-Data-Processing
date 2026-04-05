const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize_Roles");
const ROLES = require("../constant");
const { getDashBoardSummary } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get(
  "/dashboard/summary",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  getDashBoardSummary,
);
module.exports = router;
