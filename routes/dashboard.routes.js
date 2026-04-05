const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize_Roles");
const ROLES = require("../constant");
const { getDashBoardSummary } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get(
  "/summary",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST, ROLES.USER]),
  getDashBoardSummary,
);
module.exports = router;
