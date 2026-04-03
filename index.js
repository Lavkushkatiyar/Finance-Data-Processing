require("dotenv").config();
const express = require("express");
const authenticate = require("./middleware/authenticate");
const {
  registerHandler,
  loginHandler,
} = require("./controllers/auth_controller");

const { seedAdmin } = require("./utils");

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

seedAdmin().then(() => {
  console.log("Admin seeded");
}).catch(err => {
  console.error("Seeding failed:", err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});