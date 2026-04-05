const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize_Roles");
const ROLES = require("../constant");
const {
  createUserController,
  getUserController,
  deleteUserController,
} = require("../controllers/admin.controller");

const router = express.Router();

router.post(
  "/user",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  createUserController,
);
router.get(
  "/user",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  getUserController,
);
router.delete(
  "/user/:id",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  deleteUserController,
);

module.exports = router;
