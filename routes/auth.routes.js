const express = require("express");
const {
  registerHandler,
  loginHandler,
} = require("../controllers/auth_controller");
const { validate } = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/auth_schema");

const router = express.Router();

router.post("/register", validate(registerSchema), registerHandler);
router.post("/login", validate(loginSchema), loginHandler);

module.exports = router;
