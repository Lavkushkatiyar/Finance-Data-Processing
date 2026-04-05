const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize_Roles");
const ROLES = require("../constant");
const {
  createRecordSchema,
  updateRecordSchema,
  getRecordsQuerySchema,
  recordIdParamSchema,
} = require("../validators/record.schema");
const {
  createRecordController,
  getRecordsController,
  updateRecordController,
  deleteRecordController,
} = require("../controllers/record.controller");
const {
  validate,
  validateParams,
  validateQuery,
} = require("../middleware/validate");

const router = express.Router();
router.post(
  "/create",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  validate(createRecordSchema),
  createRecordController,
);

router.get(
  "/get",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER]),
  validateQuery(getRecordsQuerySchema),
  getRecordsController,
);

router.patch(
  "/:id",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  validateParams(recordIdParamSchema),
  validate(updateRecordSchema),
  updateRecordController,
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  validateParams(recordIdParamSchema),
  deleteRecordController,
);

module.exports = router;
