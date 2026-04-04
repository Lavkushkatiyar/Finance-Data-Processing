const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize_Roles");
const ROLES = require("../constant");

const router = express.Router();

router.use(authenticate);

router.get("/test", (req, res) => {
  console.log("Test route accessed");
  return res.json({ user: req.user });
});

router.get(
  "/admin-only",
  authorizeRoles([ROLES.ADMIN]),
  (req, res) => {
    return res.json({ message: "Admin access granted" });
  }
);

router.get(
  "/analytics",
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  (req, res) => {
    return res.json({ message: "Analytics data" });
  }
);

router.get(
  "/records",
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER]),
  (req, res) => {
    return res.json({ message: "Records accessible" });
  }
);

module.exports = router;
