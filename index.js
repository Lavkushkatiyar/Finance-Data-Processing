require("dotenv").config();
const express = require("express");
const authenticate = require("./middleware/authenticate");

const {
  registerHandler,
  loginHandler,
} = require("./controllers/auth_controller");

const { seedAdmin } = require("./utils");

const authorizeRoles = require("./middleware/authorize_Roles");
const ROLES = require("./constant");

const app = express();
const port = 3000;
const router = express.Router();
app.use(express.json());

app.use(express.urlencoded({extended:true}))



router.get("/me", authenticate, async (req, res) => {
  try {
    res.status(200).json({
      message: "User fetched successfully",
      user: req.user
    })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" })
  }
})

router.post("/auth/register", registerHandler);
router.post("/auth/login", loginHandler);

router.get("/test", authenticate, (req, res) => {
  console.log('Test route accessed')
  res.json({ user: req.user })
})

app.use(router);




router.get(
  "/admin-only",
  authenticate,
  authorizeRoles([ROLES.ADMIN]),
  (req, res) => {
    res.json({ message: "only admin can access ! lets see hahahdhahahaha" })
  }
)

router.get(
  "/analytics",
  authenticate,
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  (req, res) => {
    res.json({ message: "anlaytics data" })
  }
)


router.get(
  "/records",
  authenticate,
  authorizeRoles([
    ROLES.ADMIN,
    ROLES.ANALYST,
    ROLES.VIEWER
  ]),
  (req, res) => {
    res.json({ message: "theree can access" })
  }
)

seedAdmin().then(() => {
  console.log("Admin seeded");
}).catch(err => {
  console.error("Seeding failed:", err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});