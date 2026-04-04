const express = require("express")
const authenticate = require("../middleware/authenticate")
const authorizeRoles = require("../middleware/authorize_Roles")
const ROLES = require("../constant")
const {createRecordController} = require("../controllers/record.controller")

const router = express.Router()

router.post(
  "/create",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  createRecordController
)

module.exports = router