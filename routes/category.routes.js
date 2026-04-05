const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize_Roles");
const ROLES = require("../constant");
const { validate, validateParams } = require("../middleware/validate");
const {
  createCategorySchema,
  categoryIdParamSchema,
} = require("../validators/category.schema");
const {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
} = require("../controllers/category.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  validate(createCategorySchema),
  createCategoryController
);

router.get(
  "/",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER]),
  getCategoriesController
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  validateParams(categoryIdParamSchema),
  deleteCategoryController
);

module.exports = router;
