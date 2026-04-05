const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize_Roles");
const ROLES = require("../constant");

const { validate, validateParams } = require("../middleware/validate");

const {
  createUserSchema,
  userIdParamSchema,
  updateUserStatusSchema,
} = require("../validators/admin.schema");

const {
  createUserController,
  getUserController,
  deleteUserController,
  updateUserStatusController,
} = require("../controllers/admin.controller");

const router = express.Router();

router.post(
  "/user",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  validate(createUserSchema),
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
  validateParams(userIdParamSchema),
  deleteUserController,
);

router.patch(
  "/user/:id/status",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  validateParams(userIdParamSchema),
  validate(updateUserStatusSchema),
  updateUserStatusController,
);

module.exports = router;
