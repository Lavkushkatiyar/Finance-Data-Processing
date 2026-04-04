const express = require("express");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    message: "User fetched successfully",
    user: req.user,
  });
});

module.exports = router;
