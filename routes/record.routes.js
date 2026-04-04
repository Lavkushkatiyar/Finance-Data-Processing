const express = require("express")
const authenticate = require("../middleware/authenticate")
const authorizeRoles = require("../middleware/authorize_Roles")
const ROLES = require("../constant")
const {createRecordController,getRecordsController} = require("../controllers/record.controller")

const router = express.Router()

router.post(
  "/create",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  createRecordController
)
router.get(
  "/get",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER]),
  getRecordsController
)

module.exports = router